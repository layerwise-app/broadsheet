# Broadsheet

A portfolio template set like a printed newspaper. The sample owner, clients, and
work are fictional. Built with TanStack Start on Cloudflare Workers, with D1 for
contact messages.

The owner changes the site by asking the Layerwise agent, or by editing these files:

| File                          | What it holds                                                 |
| ----------------------------- | ------------------------------------------------------------- |
| `src/portfolio.config.ts`     | Name, role, location, bio, social links, fonts, colours, `ownerEmail` |
| `src/content/about.ts`        | Services, selected clients, experience, CV link               |
| `src/content/work/<slug>.ts`  | One case study                                                |
| `public/work/<slug>/`         | That case study's images                                      |

## Add a project

1. Put the source images in a folder. Name the main 3:2 landscape image `cover`
   (`cover.png`); it also becomes the share image. Use at least 2880 px wide; smaller
   images are never enlarged. GIFs are kept as they are. SVG is rejected, so export
   it to PNG first.
2. Run the image script with a kebab-case slug:

   ```bash
   pnpm add-images harbour-almanac ./my-images
   ```

   It writes 800, 1600, and 2880 px WebP files to `public/work/harbour-almanac/` and
   their dimensions and blur placeholders to
   `src/content/work/harbour-almanac.images.json`.
3. Create `src/content/work/harbour-almanac.ts`. `order` sets its place in the issue;
   the lowest is the lead story on Home.

   ```ts
   import { imagesFrom } from '~/content/images';
   import type { CaseStudy } from '~/content/types';
   import manifest from './harbour-almanac.images.json';

   const image = imagesFrom(manifest);

   const study: CaseStudy = {
     slug: 'harbour-almanac',
     title: 'The Harbour Almanac',
     kind: 'Annual almanac',
     headline: 'A Newspaper Headline for the Project',
     deck: 'One sentence under the headline.',
     client: 'Client name',
     year: 2026,
     role: 'Art director',
     disciplines: ['Art direction', 'Editorial design'],
     outcome: 'The result, in one sentence.',
     excerpt: 'The opening of the story on Home, 50 to 90 words.',
     order: 7,
     cover: { image: image('cover'), alt: 'What the cover shows.' },
     blocks: [
       { type: 'text', dropCap: true, paragraphs: ['The first paragraph.'] },
       { type: 'full-image', image: image('spread'), alt: 'What it shows.', caption: 'A caption.' }
     ],
     credits: [{ role: 'Art direction', name: 'Noor Castellan' }]
   };

   export default study;
   ```

The project then appears on Home, Work, and in the sitemap, with no other file to
change. `src/content/types.ts` documents every field. Blocks are `text`, `full-image`
(`bleed: true` runs it edge to edge), `image-pair`, `gallery` (up to 4), `quote`,
`video`, and `metrics`. In `text`, `*word*` sets italics and `[1]` points to the first
entry in `notes`, printed in the margin. Figures, notes, and folios number themselves.

## Replace the sample work

Delete, for each sample slug, `src/content/work/<slug>.ts`,
`src/content/work/<slug>.images.json`, `public/work/<slug>/`, and `sample-art/<slug>/`.
Add your own projects as above. At least one project must remain. Then update
`src/portfolio.config.ts`, `src/content/about.ts`, and `public/noor-castellan-cv.pdf`.

The sample art was built in HTML, SVG, and canvas. `pnpm render-art <slug>` renders
`sample-art/<slug>/` to PNGs in `.art/<slug>/` using the installed Google Chrome. Remove
the `sample-art` folder when it is no longer useful.

## Change the fonts and colours

Both are in `src/portfolio.config.ts`.

- **Colours:** edit `colors`. Keep body text at 4.5:1 or better against `paper`.
- **Fonts:** put open-licensed `.woff2` files in `src/styles/fonts/`, declare them in
  `src/styles/fonts.css`, and set the family names in `fonts` in the config. The fonts are
  embedded in the stylesheet, so subset them to the characters and weights you use; these
  four total about 200 KB. Sizes and spacing live in `src/styles/app.css`.

### Fonts in this template

Both are self-hosted under the SIL Open Font License 1.1 and subset to Latin, in
`src/styles/fonts/`, with their licence texts beside them.

- **Newsreader**, by Production Type: text.
- **Noto Serif Display**, by the Noto Project: headlines, pinned to its extra-condensed
  width.

The sample artwork uses other open-licensed families from Google Fonts, set into the
images at render time.

## Contact messages

Each letter is saved to the `contact_messages` table; read them on the Database page in
Layerwise. Set `ownerEmail` in `src/portfolio.config.ts` to have each one emailed too.
The form has a honeypot and a limit of 5 letters an hour per sender.

## Commands

```bash
pnpm add-images <slug> <image-or-folder>   # prepare images
pnpm check-types                           # type check
pnpm lint                                  # lint
pnpm test                                  # unit tests
pnpm build                                 # type check and production build
pnpm db:generate --name <change>           # new migration after editing src/db/schema.ts
pnpm db:migrate                            # apply migrations locally
```

Layerwise runs the dev server and applies migrations to production on publish.
