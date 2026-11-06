<a href="https://layerwise.app"><picture><source media="(prefers-color-scheme: dark)" srcset="https://layerwise.app/powered-by-dark.png"><img src="https://layerwise.app/powered-by.png" alt="Powered by Layerwise" width="174" height="28"></picture></a>

# Broadsheet

Broadsheet is a portfolio template for one designer, set like a printed newspaper. It
suits art directors, editorial and book designers, illustrators, and anyone whose work
reads best as a story. Visitors open on a front page with the lead project, a short
bio, and the rest of the work set as stories. They can then browse the Contents and filter it by
discipline, read each case study as a long-form feature with numbered figures and
margin notes, find services, clients, and a CV in the Colophon, and write in through
Letters to the editor. The sample owner, clients, and work are fictional. See the live
demo at [broadsheet.layerwise.site](https://broadsheet.layerwise.site/).

Broadsheet was built with [Layerwise](https://layerwise.app), and you can open it in
Layerwise to make your own version. It runs on TanStack Start and Cloudflare Workers,
with a D1 database for contact messages.

## Where things live

The owner changes the site by asking the Layerwise agent, or by editing these files:

| File                          | What it holds                                                 |
| ----------------------------- | ------------------------------------------------------------- |
| `src/portfolio.config.ts`     | Name, role, location, bio, social links, fonts, colours, `ownerEmail` |
| `src/content/about.ts`        | Services, selected clients, experience, CV link               |
| `src/content/work/<slug>.ts`  | One case study                                                |
| `public/work/<slug>/`         | That case study's images                                      |
| `src/lib/site.ts`             | Search and sharing: site address, default share image, fixed sitemap pages |
| `src/routes/`                 | Each page, with its headings and copy                         |
| `src/components/`             | Shared parts, such as the masthead and footer                 |
| `src/styles/app.css`          | Type sizes, spacing, and layout                               |

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
The default share image is `public/og-image.jpg`, 1200 × 630.

`tests/content.test.ts` checks the sample issue: at least six projects, and at least
five distinct images in each. Change those numbers when your own work differs.

The sample art was built in HTML, SVG, and canvas. `pnpm render-art <slug>` renders
`sample-art/<slug>/` to PNGs in `.art/<slug>/` using the installed Google Chrome.
`node sample-art/_print.mjs` prints the CV and the default share image from
`sample-art/_cv.html` and `sample-art/_og.html`. Remove the `sample-art` folder when it
is no longer useful.

## Change the fonts and colours

Both are in `src/portfolio.config.ts`.

- **Colours:** edit `colors`. Keep body text at 4.5:1 or better against `paper`.
- **Fonts:** put open-licensed `.woff2` files in `src/styles/fonts/`, declare them in
  `src/styles/fonts.css`, and set the family names in `fonts` in the config. The fonts are
  embedded in the stylesheet, so subset them to the characters and weights you use; these
  four total about 155 KB. Sizes and spacing live in `src/styles/app.css`.

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
