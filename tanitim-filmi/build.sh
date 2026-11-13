#!/bin/sh
# Filmi baştan üretir: kareler, ses, master, web sürümleri
set -e
LIB=/Users/metin/lemo-opuscar; export LIB
HERE=$(cd "$(dirname "$0")" && pwd)
cd "$LIB"
node core/render/events.mjs "$HERE"
node core/render/video.mjs "$HERE" --fps 24 --workers 4 --out "$HERE/out/video.mp4"
"$LIB/.venv/bin/python" "$HERE/mix.py"
sh core/render/mux.sh "$HERE/out/video.mp4" "$HERE/out/mix.wav" "$HERE/bir-aile-meslegi.mp4" 24 2
