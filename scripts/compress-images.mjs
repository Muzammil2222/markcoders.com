/**
 * High-quality image compression for markcoders.com
 * - JPEG: mozjpeg q=90
 * - PNG: max zlib compression (lossless); palette only if visually safe
 * - WebP: near-lossless / high quality re-encode
 * - GIF: convert to animated WebP (same basename) when smaller
 * Skips write if compressed file is not smaller.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TARGETS = [path.join(ROOT, 'src/assets'), path.join(ROOT, 'public')]
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif'])

const results = []

function fmt(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 ** 2).toFixed(2)} MB`
}

async function walk(dir) {
  const out = []
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(full)))
    else if (IMAGE_EXT.has(path.extname(e.name).toLowerCase())) out.push(full)
  }
  return out
}

async function replaceIfSmaller(originalPath, buffer, note) {
  const before = (await fs.stat(originalPath)).size
  if (buffer.length >= before) {
    results.push({
      file: path.relative(ROOT, originalPath),
      before,
      after: before,
      saved: 0,
      note: `${note} (kept original — no savings)`,
    })
    return false
  }
  await fs.writeFile(originalPath, buffer)
  results.push({
    file: path.relative(ROOT, originalPath),
    before,
    after: buffer.length,
    saved: before - buffer.length,
    note,
  })
  return true
}

async function compressJpeg(file) {
  const buf = await sharp(file)
    .rotate()
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer()
  await replaceIfSmaller(file, buf, 'jpeg q90 mozjpeg')
}

async function compressPng(file) {
  // Lossless max compression first
  const lossless = await sharp(file)
    .png({ compressionLevel: 9, effort: 10, palette: false })
    .toBuffer()

  // Optional palette pass for icons/UI with few colors — only keep if still looks full-res
  // and is meaningfully smaller. Quality sensing: if palette cut > 40% and width/height ok.
  let best = lossless
  let note = 'png lossless zlib9'
  try {
    const meta = await sharp(file).metadata()
    const pixels = (meta.width || 0) * (meta.height || 0)
    // Palette helps small UI icons; avoid for large photos
    if (pixels > 0 && pixels < 600_000) {
      const palette = await sharp(file)
        .png({ compressionLevel: 9, effort: 10, palette: true, quality: 100, colors: 256 })
        .toBuffer()
      if (palette.length < best.length * 0.85) {
        best = palette
        note = 'png palette+zlib9'
      }
    }
  } catch {
    /* keep lossless */
  }

  await replaceIfSmaller(file, best, note)
}

async function compressWebp(file) {
  // Near-lossless first; fall back to high-quality lossy if bigger
  let buf
  let note
  try {
    buf = await sharp(file, { animated: true })
      .webp({ nearLossless: true, quality: 90, effort: 6 })
      .toBuffer()
    note = 'webp nearLossless q90'
  } catch {
    buf = await sharp(file)
      .webp({ quality: 90, effort: 6 })
      .toBuffer()
    note = 'webp q90'
  }

  const before = (await fs.stat(file)).size
  if (buf.length >= before) {
    // Try slightly more aggressive but still high quality
    buf = await sharp(file, { animated: true })
      .webp({ quality: 85, effort: 6 })
      .toBuffer()
    note = 'webp q85'
  }
  await replaceIfSmaller(file, buf, note)
}

async function compressGif(file) {
  // Convert animated GIF → WebP (same basename), keep GIF only if webp not smaller
  const webpPath = file.replace(/\.gif$/i, '.webp')
  const before = (await fs.stat(file)).size

  let buf
  try {
    buf = await sharp(file, { animated: true })
      .webp({ quality: 88, effort: 6 })
      .toBuffer()
  } catch (err) {
    results.push({
      file: path.relative(ROOT, file),
      before,
      after: before,
      saved: 0,
      note: `gif skipped: ${err.message}`,
    })
    return null
  }

  if (buf.length >= before) {
    results.push({
      file: path.relative(ROOT, file),
      before,
      after: before,
      saved: 0,
      note: 'gif kept (webp not smaller)',
    })
    return null
  }

  await fs.writeFile(webpPath, buf)
  await fs.unlink(file)
  results.push({
    file: path.relative(ROOT, file) + ' → ' + path.basename(webpPath),
    before,
    after: buf.length,
    saved: before - buf.length,
    note: 'gif→webp animated q88',
  })
  return { from: file, to: webpPath }
}

async function updateGifReferences(conversions) {
  if (!conversions.length) return
  const codeRoots = [path.join(ROOT, 'src'), path.join(ROOT, 'index.html')]
  const files = []
  async function walkCode(p) {
    const st = await fs.stat(p)
    if (st.isFile()) {
      if (/\.(jsx?|tsx?|css|html|md)$/i.test(p)) files.push(p)
      return
    }
    for (const e of await fs.readdir(p)) {
      if (e === 'node_modules' || e === 'dist') continue
      await walkCode(path.join(p, e))
    }
  }
  for (const r of codeRoots) {
    try {
      await walkCode(r)
    } catch {
      /* skip */
    }
  }

  for (const { from, to } of conversions) {
    const fromBase = path.basename(from)
    const toBase = path.basename(to)
    for (const f of files) {
      let text = await fs.readFile(f, 'utf8')
      if (!text.includes(fromBase)) continue
      const next = text.split(fromBase).join(toBase)
      if (next !== text) {
        await fs.writeFile(f, next)
        console.log(`  updated refs in ${path.relative(ROOT, f)}: ${fromBase} → ${toBase}`)
      }
    }
  }
}

async function main() {
  console.log('Scanning…')
  const files = []
  for (const t of TARGETS) files.push(...(await walk(t)))
  console.log(`Found ${files.length} images\n`)

  const gifConversions = []

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    process.stdout.write(`  ${path.relative(ROOT, file)} … `)
    try {
      if (ext === '.jpg' || ext === '.jpeg') await compressJpeg(file)
      else if (ext === '.png') await compressPng(file)
      else if (ext === '.webp') await compressWebp(file)
      else if (ext === '.gif') {
        const conv = await compressGif(file)
        if (conv) gifConversions.push(conv)
      }
      const last = results[results.length - 1]
      if (last) {
        const pct = last.before ? ((last.saved / last.before) * 100).toFixed(1) : '0'
        console.log(`${fmt(last.before)} → ${fmt(last.after)} (−${pct}%) [${last.note}]`)
      } else console.log('ok')
    } catch (err) {
      console.log(`ERROR: ${err.message}`)
      results.push({
        file: path.relative(ROOT, file),
        before: 0,
        after: 0,
        saved: 0,
        note: `error: ${err.message}`,
      })
    }
  }

  if (gifConversions.length) {
    console.log('\nUpdating code references for GIF→WebP…')
    await updateGifReferences(gifConversions)
  }

  const totalBefore = results.reduce((s, r) => s + r.before, 0)
  const totalAfter = results.reduce((s, r) => s + r.after, 0)
  const totalSaved = totalBefore - totalAfter

  console.log('\n========== SUMMARY ==========')
  console.log(`Files processed: ${results.length}`)
  console.log(`Before: ${fmt(totalBefore)}`)
  console.log(`After:  ${fmt(totalAfter)}`)
  console.log(`Saved:  ${fmt(totalSaved)} (${totalBefore ? ((totalSaved / totalBefore) * 100).toFixed(1) : 0}%)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
