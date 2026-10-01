#!/usr/bin/env node
/**
 * Shrink oversized source images in place.
 *
 * A JPEG's file size says nothing about what it costs at runtime: the browser
 * decodes it to raw RGBA, so a 3024x4032 photo holds ~49MB of memory no matter
 * how well it compresses. Rendering a handful of those into 320px slots is what
 * makes phones evict textures and stutter while scrolling.
 *
 * Usage:
 *   npm run optimize:images           # rewrite anything over the limits
 *   npm run optimize:images -- --dry  # report only
 */
import { readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIRS = [path.join(ROOT, 'src/assets'), path.join(ROOT, 'public')]

const MAX_WIDTH = 1920
const MAX_HEIGHT = 1920
const WEBP_QUALITY = 78
const JPEG_QUALITY = 80
const PNG_QUALITY = 80
const MIN_BYTES = 120_000 // leave small files alone

const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const DRY = process.argv.includes('--dry')

async function* walk(dir) {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (EXT.has(path.extname(entry.name).toLowerCase())) yield full
  }
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)}MB`
const mp = (w, h) => `${((w * h) / 1e6).toFixed(1)}MP`

let scanned = 0
let touched = 0
let before = 0
let after = 0

for (const dir of DIRS) {
  for await (const file of walk(dir)) {
    scanned += 1
    const { size } = await stat(file)
    const image = sharp(file, { failOn: 'none' })
    const meta = await image.metadata()
    const { width = 0, height = 0 } = meta

    const tooBig = width > MAX_WIDTH || height > MAX_HEIGHT
    const tooHeavy = size > MIN_BYTES
    if (!tooBig && !tooHeavy) continue

    const ext = path.extname(file).toLowerCase()
    let pipeline = image.rotate()
    if (tooBig) {
      pipeline = pipeline.resize({
        width: MAX_WIDTH,
        height: MAX_HEIGHT,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    if (ext === '.webp') pipeline = pipeline.webp({ quality: WEBP_QUALITY, effort: 5 })
    else if (ext === '.png') pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 })
    else pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })

    const output = await pipeline.toBuffer({ resolveWithObject: true })
    if (output.data.length >= size && !tooBig) continue

    const rel = path.relative(ROOT, file)
    console.log(
      `${DRY ? '[dry] ' : ''}${rel}\n` +
        `      ${width}x${height} (${mp(width, height)}, ${mb(size)})` +
        ` -> ${output.info.width}x${output.info.height}` +
        ` (${mp(output.info.width, output.info.height)}, ${mb(output.data.length)})`
    )

    if (!DRY) await writeFile(file, output.data)
    touched += 1
    before += size
    after += output.data.length
  }
}

console.log(
  `\nScanned ${scanned} images, ${DRY ? 'would rewrite' : 'rewrote'} ${touched}.` +
    (touched ? ` ${mb(before)} -> ${mb(after)}` : '')
)
