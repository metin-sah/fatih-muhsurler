/**
 * Kabul kriteri denetimi: ziyaretçiye görünen bileşenlerde sabit metin olmamalı.
 * JSX metin düğümlerini ve görünür öznitelikleri (alt, title, placeholder, aria-label, label) tarar.
 *   npm run audit:content
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOTS = ['src/components', 'src/app/(frontend)']
const SKIP = [/src\/components\/admin\//] // Yönetim paneli arayüzü, site içeriği değildir.
const LETTERS = /[A-Za-zÇĞİÖŞÜçğıöşü]{2,}/
const TEXT_NODE = /(?<![=\-])>([^<>{}`]*?)</g
const ATTR = /\b(alt|title|placeholder|aria-label|label)=(["'])([^"']*)\2/g

const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full)
    else if (/\.(tsx|jsx)$/.test(name)) files.push(full)
  }
}
ROOTS.forEach(walk)

const findings = []
for (const file of files) {
  const rel = relative(process.cwd(), file)
  if (SKIP.some((re) => re.test(rel))) continue
  const source = readFileSync(file, 'utf8')
  const code = source.replace(/\/\*[\s\S]*?\*\/|^\s*\/\/.*$/gm, (m) => m.replace(/[^\n]/g, ' '))
  const lineOf = (offset) => code.slice(0, offset).split('\n').length
  // Çok satırlı JSX metinleri de yakalanır.
  for (const match of code.matchAll(TEXT_NODE)) {
    const text = match[1].replace(/\s+/g, ' ').trim()
    if (text && LETTERS.test(text) && !/[=;()&|:,]|=>/.test(text) && !/^(return|if|else|const|let|await|export|case|default)\b/.test(text)) findings.push(`${rel}:${lineOf(match.index)}  metin: "${text}"`)
  }
  for (const match of code.matchAll(ATTR)) {
    if (LETTERS.test(match[3])) findings.push(`${rel}:${lineOf(match.index)}  ${match[1]}="${match[3]}"`)
  }
}

if (findings.length) {
  console.error(`Sabit içerik bulundu (${findings.length}):\n` + findings.join('\n'))
  process.exit(1)
}
console.log(`✓ ${files.length} bileşen dosyası tarandı; sabit içerik bulunmadı.`)
