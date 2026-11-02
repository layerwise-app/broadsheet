/** One prepared image, as `pnpm add-images` writes it to `<slug>.images.json`. */
export type Picture = {
  format: string;
  /** Path stem for WebP versions: `${base}-${width}.webp`. */
  base?: string;
  /** Direct path, for GIFs. */
  src?: string;
  width: number;
  height: number;
  widths: number[];
  /** Tiny WebP data URI shown until the image arrives. */
  blur: string;
  /** 1200×630 JPG for link previews; only on an image named `cover`. */
  share?: string;
};

export type Figure = {
  image: Picture;
  /** What the image shows, for people who can't see it. */
  alt: string;
  /** Printed under the image with an automatic figure number. */
  caption?: string;
};

export type FullImageBlock = Figure & {
  type: 'full-image';
  /** Runs edge to edge across the screen as a full-bleed spread. */
  bleed?: boolean;
};

export type ImagePairBlock = {
  type: 'image-pair';
  items: [Figure, Figure];
};

export type GalleryBlock = {
  type: 'gallery';
  /** Up to four images. */
  items: [Figure] | [Figure, Figure] | [Figure, Figure, Figure] | [Figure, Figure, Figure, Figure];
};

export type TextBlock = {
  type: 'text';
  /** Optional crosshead above the text. */
  heading?: string;
  /**
   * `*word*` sets italics. `[1]` places a reference to the first entry of
   * `notes`, which is printed in the margin.
   */
  paragraphs: string[];
  /** Margin notes. On phones they follow the text. */
  notes?: string[];
  /** Two runs the text in newspaper columns on wide screens. Default 1. */
  columns?: 1 | 2;
  /** Opens the first paragraph with a drop cap. */
  dropCap?: boolean;
};

export type QuoteBlock = {
  type: 'quote';
  text: string;
  attribution?: string;
};

export type VideoBlock = {
  type: 'video';
  /** An MP4 in `public/work/<slug>/`. */
  src: string;
  poster: Picture;
  /** What the video shows, for people who can't see it. */
  alt: string;
  caption?: string;
};

export type Metric = { value: string; label: string };

export type MetricsBlock = {
  type: 'metrics';
  heading?: string;
  items: Metric[];
};

export type Block =
  | FullImageBlock
  | ImagePairBlock
  | GalleryBlock
  | TextBlock
  | QuoteBlock
  | VideoBlock
  | MetricsBlock;

export type Credit = { role: string; name: string };

export type CaseStudy = {
  /** Must match the file name: `src/content/work/<slug>.ts`. */
  slug: string;
  /** The project's short name, as it appears on the Contents page. */
  title: string;
  /** What it is, in a few words, like `Book jacket series`. Printed above headlines. */
  kind: string;
  /** The newspaper headline, used on Home and at the top of the feature. */
  headline: string;
  /** One sentence under the headline. */
  deck: string;
  client: string;
  year: number;
  role: string;
  disciplines: string[];
  /** The result, in one sentence. */
  outcome: string;
  /** 50 to 90 words: the story's opening on the Home page. */
  excerpt: string;
  /** Lower comes first; the lowest is the lead story on Home. */
  order: number;
  /** A 3:2 landscape image named `cover`. Also the share image. */
  cover: Figure;
  /** A second image for Home and Contents. Portrait works well. */
  plate?: Figure;
  blocks: Block[];
  credits: Credit[];
};
