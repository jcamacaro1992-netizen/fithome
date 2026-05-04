// Generates public/icons/icon-192.png and icon-512.png
// Pure Node.js — no extra packages needed.
// Run: node scripts/generate-icons.js

const zlib = require('zlib')
const fs   = require('fs')
const path = require('path')

// CRC32 for PNG chunks
function crc32(buf) {
  let c = 0xFFFFFFFF
  for (const b of buf) {
    c ^= b
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (c & 1 ? 0xEDB88320 : 0)
  }
  return (c ^ 0xFFFFFFFF) >>> 0
}

function pngChunk(type, data) {
  const t = Buffer.from(type)
  const l = Buffer.alloc(4); l.writeUInt32BE(data.length)
  const cc = Buffer.alloc(4); cc.writeUInt32BE(crc32(Buffer.concat([t, data])))
  return Buffer.concat([l, t, data, cc])
}

// Parse hex color → [r, g, b]
function hex(h) {
  return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]
}

function makePNG(size) {
  const BG     = hex('#0C0D0F')
  const ACCENT = hex('#C6F135')
  const CARD   = hex('#1A1B1F')

  // 3 bytes per pixel (RGB)
  const img = Buffer.alloc(size * size * 3)

  const cx = size / 2, cy = size / 2

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 3
      const dx = x - cx, dy = y - cy
      const dist = Math.sqrt(dx*dx + dy*dy)

      // Outer background circle (rounded icon)
      const outerR = size * 0.46

      if (dist > outerR) {
        // Outside icon → transparent-ish bg
        img[i] = BG[0]; img[i+1] = BG[1]; img[i+2] = BG[2]
        continue
      }

      // Inner card background
      const cardR = size * 0.44
      if (dist <= cardR) {
        img[i] = CARD[0]; img[i+1] = CARD[1]; img[i+2] = CARD[2]
      }

      // Accent ring
      if (dist >= cardR && dist <= outerR) {
        img[i] = ACCENT[0]; img[i+1] = ACCENT[1]; img[i+2] = ACCENT[2]
        continue
      }

      // Draw "FH" letters as pixel blocks
      const nx = (x - cx) / (size * 0.5)  // normalized -1..1
      const ny = (y - cy) / (size * 0.5)

      // F shape (left half, top area)
      const inF = (nx >= -0.52 && nx <= -0.08 && ny >= -0.42 && ny <= 0.42) ||
                  (nx >= -0.52 && nx <= 0.02  && ny >= -0.42 && ny <= -0.22) ||
                  (nx >= -0.52 && nx <= -0.04 && ny >= -0.10 && ny <= 0.10)

      // H shape (right half)
      const inH = (nx >= 0.08 && nx <= 0.28 && ny >= -0.42 && ny <= 0.42) ||
                  (nx >= 0.42 && nx <= 0.62 && ny >= -0.42 && ny <= 0.42) ||
                  (nx >= 0.08 && nx <= 0.62 && ny >= -0.10 && ny <= 0.10)

      if (inF || inH) {
        img[i] = ACCENT[0]; img[i+1] = ACCENT[1]; img[i+2] = ACCENT[2]
      }
    }
  }

  // Build scanlines with filter byte 0 (None) before each row
  const rows = []
  for (let y = 0; y < size; y++) {
    rows.push(0)  // filter byte
    for (let x = 0; x < size * 3; x++) {
      rows.push(img[y * size * 3 + x])
    }
  }

  const raw        = Buffer.from(rows)
  const compressed = zlib.deflateSync(raw, { level: 9 })

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8]  = 8  // bit depth
  ihdr[9]  = 2  // RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0

  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0))
  ])
}

const outDir = path.join(__dirname, '../public/icons')
fs.mkdirSync(outDir, { recursive: true })

for (const size of [192, 512]) {
  const buf = makePNG(size)
  const out = path.join(outDir, `icon-${size}.png`)
  fs.writeFileSync(out, buf)
  console.log(`✓ icon-${size}.png  (${buf.length} bytes)`)
}

console.log('\nIconos generados en public/icons/')
