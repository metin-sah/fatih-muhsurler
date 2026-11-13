#!/usr/bin/env python3
"""Seslendirmeyi Gemini TTS ile üretir.

  python gemini_tts.py audition            her aday sesle tek satır: voices_gemini/deneme_<ses>.wav
  python gemini_tts.py <Ses>               tüm satırlar: voices/<id>.wav ve voices/dur.json

Anahtar: GEMINI_API_KEY ortam değişkeni ya da bu klasördeki .env dosyası.
Metin lines.json içindeki "say" alanından alınır; model metni olduğu gibi okur,
ton ve tempo yalnızca "style" alanıyla verilir.
"""
import base64, io, json, os, subprocess, sys, tempfile, time
import numpy as np, soundfile as sf

D = os.path.dirname(os.path.abspath(__file__))
MODEL = 'gemini-3.8-flash-tts'
URL = 'https://generativelanguage.googleapis.com/v1beta/interactions'
ADAYLAR = ['Charon', 'Orus', 'Alnilam', 'Algenib', 'Rasalgethi']
STYLE = 'deep, resonant documentary narration; calm, grounded and unhurried, in Turkish'
SR = 24000


def key():
    k = os.environ.get('GEMINI_API_KEY', '').strip()
    p = f'{D}/.env'
    if not k and os.path.exists(p):
        for line in open(p, encoding='utf-8'):
            if line.startswith('GEMINI_API_KEY='):
                k = line.split('=', 1)[1].strip().strip('"\'')
    if not k:
        sys.exit('GEMINI_API_KEY bulunamadı (ortam değişkeni ya da tanitim-filmi/.env).')
    return k


def find_audio(node):
    """Yanıttaki base64 ses verisini bulur."""
    if isinstance(node, dict):
        for name in ('data', 'audio', 'bytes'):
            v = node.get(name)
            if isinstance(v, str) and len(v) > 1000:
                return v
        node = list(node.values())
    if isinstance(node, list):
        for v in node:
            found = find_audio(v)
            if found:
                return found
    return None


def synth(text, voice, k):
    body = {
        'model': MODEL,
        'input': [{'type': 'user_input', 'content': [{'type': 'text', 'text': text,
                   'annotations': [{'type': 'speech_metadata', 'style': STYLE}]}]}],
        'response_format': {'type': 'audio'},
        'generation_config': {'speech_config': [{'voice': voice}]},
    }
    res = None
    with tempfile.NamedTemporaryFile('w', suffix='.json', encoding='utf-8') as tf:
        json.dump(body, tf, ensure_ascii=False); tf.flush()
        for attempt in range(5):
            # anahtar komut satırında görünmesin diye başlık stdin'den verilir; TLS doğrulaması açık
            r = subprocess.run(['curl', '-sS', '--max-time', '180', '-X', 'POST', URL, '-H', 'Content-Type: application/json',
                                '-H', '@-', '--data-binary', f'@{tf.name}', '-w', '\n%{http_code}'],
                               input=f'x-goog-api-key: {k}\n', capture_output=True, text=True)
            out, _, code = r.stdout.rpartition('\n')
            if code == '200':
                res = json.loads(out); break
            if code in ('000', '429', '500', '503') and attempt < 4:
                time.sleep(20 * (attempt + 1)); continue
            sys.exit(f'Gemini hatası {code}: {out[:500]} {r.stderr[:200]}')
    if res is None:
        sys.exit('Gemini isteği sonuçlanmadı')
    b64 = find_audio(res)
    if not b64:
        sys.exit('Yanıtta ses yok: ' + json.dumps(res)[:400])
    raw = base64.b64decode(b64)
    if raw[:4] == b'RIFF':
        x, sr = sf.read(io.BytesIO(raw))
    else:
        x, sr = np.frombuffer(raw, dtype='<i2').astype(float) / 32768, SR
    return x, sr


def trim(x, sr):
    level = np.convolve(np.abs(x), np.ones(240) / 240, 'same')
    on = np.where(level > .012)[0]
    if not len(on):
        return x
    return x[max(0, on[0] - int(.03 * sr)):min(len(x), on[-1] + int(.08 * sr))]


def f0(x, sr):
    """Konuşma karelerinde otokorelasyonla medyan temel frekans."""
    n, out = int(.04 * sr), []
    for i in range(0, len(x) - n, n):
        w = x[i:i + n] * np.hanning(n)
        if np.sqrt((w ** 2).mean()) < .02:
            continue
        c = np.correlate(w, w, 'full')[n - 1:]
        lo, hi = int(sr / 250), int(sr / 60)
        p = lo + int(np.argmax(c[lo:hi]))
        if c[p] > .35 * c[0]:
            out.append(sr / p)
    return float(np.median(out)) if out else 0.


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    k, lines = key(), json.load(open(f'{D}/lines.json', encoding='utf-8'))
    if sys.argv[1] == 'audition':
        os.makedirs(f'{D}/voices_gemini', exist_ok=True)
        text = lines[1]['say']
        for v in ADAYLAR:
            x, sr = synth(text, v, k)
            x = trim(x, sr)
            sf.write(f'{D}/voices_gemini/deneme_{v}.wav', x, sr)
            print(f'{v:12s} süre {len(x) / sr:5.2f} sn   temel frekans ~{f0(x, sr):5.1f} Hz')
        return
    voice, dur = sys.argv[1], {}
    os.makedirs(f'{D}/voices', exist_ok=True)
    for L in lines:
        x, sr = synth(L.get('say') or L['text'], voice, k)
        x = trim(x, sr)
        sf.write(f"{D}/voices/{L['id']}.wav", x, sr)
        dur[L['id']] = round(len(x) / sr, 3)
        print(L['id'], dur[L['id']], f'f0 ~{f0(x, sr):.0f} Hz')
    json.dump(dur, open(f'{D}/voices/dur.json', 'w'), indent=1)


if __name__ == '__main__':
    main()
