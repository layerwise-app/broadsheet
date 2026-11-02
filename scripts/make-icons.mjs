// Regenerates public/logo.png and every favicon from public/logo.svg.
//   node scripts/make-icons.mjs
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const svg = await readFile('public/logo.svg');
await writeFile('public/favicon.svg', svg);
const png = (size) =>
  sharp(svg, { density: Math.ceil((72 * size) / 1024) * 4 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

const files = {
  'public/logo.png': 1024,
  'public/favicon.png': 512,
  'public/favicon-16x16.png': 16,
  'public/favicon-32x32.png': 32,
  'public/apple-touch-icon.png': 180,
  'public/android-chrome-192x192.png': 192,
  'public/android-chrome-512x512.png': 512
};
for (const [path, size] of Object.entries(files)) {
  await writeFile(path, await png(size));
}

// An .ico is a small directory followed by the PNGs themselves.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, index) => {
  const at = 6 + 16 * index;
  header.writeUInt8(size, at);
  header.writeUInt8(size, at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(images[index].length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += images[index].length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...images]));
