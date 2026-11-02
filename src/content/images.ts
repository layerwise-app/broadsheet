import type { Picture } from './types';

/**
 * Reads a `<slug>.images.json` manifest. Names are checked by TypeScript:
 *   const image = imagesFrom(manifest);
 *   image('cover');
 */
export function imagesFrom<T extends Record<string, Picture>>(manifest: T) {
  return (name: keyof T & string): Picture => manifest[name];
}

/** The `srcset` attribute for a picture; empty for GIFs. */
export function srcSetOf(picture: Picture): string | undefined {
  if (!picture.base) return undefined;
  return picture.widths.map((width) => `${picture.base}-${width}.webp ${width}w`).join(', ');
}

/** The `src` attribute for a picture: the middle size, or the GIF itself. */
export function srcOf(picture: Picture): string {
  if (picture.src) return picture.src;
  const width = picture.widths[Math.min(1, picture.widths.length - 1)];
  return `${picture.base}-${width}.webp`;
}
