import { imagesFrom } from '~/content/images';
import type { CaseStudy } from '~/content/types';
import manifest from './salt-library.images.json';

const image = imagesFrom(manifest);

const saltLibrary: CaseStudy = {
  slug: 'salt-library',
  title: 'The Salt Library',
  kind: 'Book jacket series',
  headline: 'Twelve Forgotten Novels, Two Inks Apiece and a Budget of 38 Cents',
  deck: 'A three-person press in Setúbal needed its translated fiction to be seen across a bookshop, at about half the old cost of a jacket.',
  client: 'Ostra Press',
  year: 2024,
  role: 'Series art director and jacket designer',
  disciplines: ['Art direction', 'Book design', 'Type direction'],
  outcome:
    'Seven of the twelve titles went back to press within sixteen months, and first-year sales averaged 1,540 copies a title against Ostra’s previous 610.',
  excerpt:
    'Ostra Press had found twelve mid-century novels nobody in English had read, and €0.38 a copy to dress them. That ruled out photography, lamination, and a third colour. So each jacket was cut from paper with a scalpel, printed in two spot inks on kraft or bone, and held to a type system strict enough to make twelve books read as one shelf from the far side of the shop.',
  order: 2,
  cover: {
    image: image('cover'),
    alt: 'Ten Salt Library jackets in two rows on a flat harbour blue field, each with a bold cut-paper composition in two inks: a table seen from above, a lighthouse beam, washing on a line, salt heaps, a house front, a ringed harbour, a volcano, twelve fish, tide waves, and a net.',
    caption: 'Ten of the twelve fronts, as they were laid out for the sales conference.'
  },
  plate: {
    image: image('plate'),
    alt: 'Jacket for The Keeperless Light by Xoán Bermúdez Rial: a black flood with a lighthouse beam cut out of it to bare bone paper, the core of the beam printed in ochre.',
    caption: 'No. 04, *The Keeperless Light*. Ostra Black and Salt Ochre on bone.'
  },
  blocks: [
    {
      type: 'text',
      dropCap: true,
      paragraphs: [
        'Ostra Press is three people above a ship chandler in Setúbal. In the autumn of 2022 Inês Albergaria, who owns it, asked me to design the jackets for a series she had spent six years assembling: twelve mid-century novels, translated into English for the first time from Portuguese, Cape Verdean Creole, and Galician.[1] None of the authors is known outside a few university departments. Several are not known inside them.',
        'The brief arrived on a postcard, which I still have. The books had to be seen from across a shop. They had to read as one library. And they could not cost more than the €0.38 per jacket left over after translators and paper. Ostra’s usual four-colour laminated jacket came in at €0.71, on runs of 3,000 that took four years to sell. These would run to 1,800 a title.'
      ],
      notes: [
        'Albergaria chose the twelve from about 140 candidates. She reads Portuguese and Galician in the original and paid two readers for the Creole.'
      ]
    },
    {
      type: 'full-image',
      bleed: true,
      image: image('jacket-unfolded'),
      alt: 'The flat jacket for Washing Day on Maio on black: back flap, back panel, vermilion spine, front panel, and front flap. Two washing lines run unbroken across the back and front, hung with shirts, sheets, and trousers in blue and red on kraft.',
      caption:
        'No. 12, *Washing Day on Maio*, flat. The lines run round the book, so the back panel is worth turning over. Harbour Blue and Signal Vermilion on 120 g kraft.'
    },
    {
      type: 'text',
      heading: 'What 38 cents buys',
      columns: 2,
      paragraphs: [
        'I spent the first fortnight with the estimator at Gráfica Sado rather than at a desk. At 1,800 copies, the largest variable cost on a jacket is the press wash-up between inks, followed by the die, followed by anything that goes on after printing. A third colour moved the quote to €0.46. Lamination took it to €0.52. A photograph needed a licence, and for most of these books no suitable picture existed anyway: there is no archive of the salt workers of Aldeia da Marinha, because no one thought to make one.',
        'So the rules wrote themselves. Two spot inks on an uncoated stock. No finish of any kind. No licensed images. And one die for all twelve books, which was the hard one, because the novels run from 168 pages to 416. A jacket die is usually made to suit a spine.[1]',
        'The answer came from Filipa Neto, Ostra’s production manager, who pointed out that nobody measures a flap. We fixed the flat jacket at 440 mm. As the spine grows from 17 mm to 31 mm, the flaps shrink from 82.5 mm to 75.5 mm, and the same die cuts every title. That one conversation saved €1,760 across the series.'
      ],
      notes: [
        'Sado’s quote allowed €160 per die. Twelve dies would have added nine cents to every jacket before a sheet was printed.'
      ]
    },
    {
      type: 'quote',
      text: 'I told Noor I could not afford a designer who wanted a third colour. Noor said that was a relief, because nobody wanted one.',
      attribution: 'Inês Albergaria, publisher, Ostra Press'
    },
    {
      type: 'image-pair',
      items: [
        {
          image: image('plate'),
          alt: 'Jacket for The Keeperless Light: a black flood with a wide lighthouse beam cut out to bone paper and an ochre core running from a small striped tower to the right edge.',
          caption: 'No. 04. The black is the expensive part; everything you read as light is bare paper.'
        },
        {
          image: image('front-table'),
          alt: 'Jacket for A Table for Eleven by Olinda Morais: a long vermilion table from above with eleven cream plates and black chairs. One place on the right has no plate and no chair.',
          caption: 'No. 06. Twelve places, eleven laid. The gap is the plot.'
        }
      ]
    },
    {
      type: 'text',
      heading: 'Cut, not drawn',
      paragraphs: [
        'With no pictures to buy, the jackets had to be made. I read all twelve manuscripts in the first draft of their translations and wrote one object on an index card for each: a tide gauge, a raked heap of salt, a net gathered to a point. Then I cut each one from coloured paper with a scalpel, at jacket size, on a kitchen table in Graça.[1]',
        'Cutting kept me honest. A scalpel cannot render a mood, so the compositions had to rest on a single large decision. *Morna for a Closed Port* is a ring with a bar across its mouth and a boat sitting on five stave lines like a note. *Ribs of the Santa Clara* is five frames of a schooner seen from the stem, sinking into a band of blue. *The Sardine Almanac* has twelve fish, one for each month and chapter, and the July fish is red because that is the month the foreman dies.',
        'Once a composition held up, I scanned it and redrew it as two separations, keeping the wobble of the blade on every edge. A clean vector line on kraft looks like a mistake. A cut one looks like someone meant it.'
      ],
      notes: [
        'I cut about ninety compositions and threw away seventy-eight. The lighthouse took eleven attempts; the washing line took one.'
      ]
    },
    {
      type: 'full-image',
      image: image('type-system'),
      alt: 'A working drawing of the Nets for the Widow Brava jacket and spine with red measuring lines at 13.5, 26.5, 39, 46.5, 175, and 192 millimetres, beside a rule sheet listing the type specification, the flap arithmetic for 17 mm and 31 mm spines, and a specimen of accented letters.',
      caption:
        'The rule sheet that went to Ostra and to Sado. It fits on one side of A4, and nobody has needed the other side.'
    },
    {
      type: 'text',
      heading: 'One voice on the spine',
      columns: 2,
      paragraphs: [
        'If the pictures were going to vary this much, the type could not vary at all. Every title is Besley ExtraBold, 46 on 50, in exactly two lines, with the author above it in Familjen Grotesk. I chose Besley for its slab-footed Clarendon manners, which belong to the period and to the Portuguese printing I grew up looking at, and because it holds its accents at full weight. Xoán and Évora should not look like an afterthought.',
        'Two lines was a real constraint on the editors. *Seven Windows on Rua do Sal* fits with four units to spare. Tomás Reboredo, the series editor, retitled one novel rather than let it run to three, and the author’s estate agreed by return of post.',
        'The spine is stricter still. Numeral at the head, title reading downward from a fixed point, author ranged to 175 mm, the Ostra mark at the foot. Inks swap from book to book. Positions never do. Stood together, the spines make a colour chart with a very consistent caption.'
      ]
    },
    {
      type: 'gallery',
      items: [
        {
          image: image('front-nets'),
          alt: 'Jacket for Nets for the Widow Brava: a dark green net narrowing to a point on kraft paper, red floats on its head rope and one red fish caught in the belly.',
          caption: 'No. 03. Net Green and Signal Vermilion on kraft.'
        },
        {
          image: image('front-ribs'),
          alt: 'Jacket for Ribs of the Santa Clara: five nested rust-red ship’s frames seen from the stem, overprinting a dark blue band of water so that the ribs turn black below the waterline.',
          caption: 'No. 05. The waterline is an overprint, not a third ink.'
        },
        {
          image: image('front-sardine'),
          alt: 'Jacket for The Sardine Almanac: twelve dark blue fish in two columns, each carrying a month in reversed type. July is red.',
          caption: 'No. 09. Twelve months, one bad one.'
        }
      ]
    },
    {
      type: 'text',
      heading: 'Eight inks, two papers',
      paragraphs: [
        'Uncoated kraft eats ink. Signal Vermilion on bone is a shout; on kraft it goes down to the colour of a rusted hull, which I liked for the shipyard book and hated for the kitchen one. So every pairing was proofed on both stocks, three rounds in all, and *A Table for Eleven* moved to bone in the second round.',
        'We mixed eight inks at Sado and gave each title two. Where they cross, they multiply, and that overprint is the third colour we were not paying for. Ribs turn black under the waterline. A sun goes dark behind a wave. I stopped thinking of it as a limitation about halfway through, when I noticed I had started designing for the overlap first.'
      ]
    },
    {
      type: 'full-image',
      image: image('swatches'),
      alt: 'A proof sheet on cream paper: eight named inks shown solid and as a 40 percent dot on kraft and bone, beside a grid of the twelve titles with two overlapping circles showing each pairing and its overprint.',
      caption: 'Proof 3 of 3, January 2024. Every ink in the series, on both stocks, with its pairing.'
    },
    {
      type: 'quote',
      text: 'Noor stood at the delivery end for two days with a loupe, and on the second day asked me to put less ink on, which no designer has asked me in forty-one years.',
      attribution: 'Domingos Sá, pressman, Gráfica Sado'
    },
    {
      type: 'full-image',
      bleed: true,
      image: image('press-sheet'),
      alt: 'A signed kraft press sheet with four flat jackets imposed two by two, with crop marks, fold ticks, registration targets, a slug line, and a colour bar along the foot.',
      caption:
        'Forme 3 of 9. The four titles that share Harbour Blue and Signal Vermilion run together, which avoids three wash-ups.'
    },
    {
      type: 'text',
      paragraphs: [
        'The press run took nine formes, because four titles could share a pair of inks and the other eight could not. Gráfica Sado delivered in March 2024 at €0.34 a jacket, four cents under the postcard.',
        'Ostra sent the first six to sixty-four independent shops with a request that they be stood face out, and most of them were, since a kraft book with a red table on it is an easy thing to put in a window. Average first-year sales came to 1,540 copies a title, where Ostra’s translated fiction had averaged 610. Seven of the twelve went back to press within sixteen months.[1] The authors’ estates, some of whom had to be found first, have had royalty statements for the first time since the 1960s.',
        'I keep the spines on the shelf above my desk. They are the only thing in the studio I have not wanted to redesign.'
      ],
      notes: [
        'Reprints added 10,500 copies at the same specification. *Morna for a Closed Port* has now been reprinted twice, which puzzles everyone but its translators.'
      ]
    },
    {
      type: 'full-image',
      image: image('spines'),
      alt: 'All twelve spines standing in a row on a black shelf against an ochre wall, in widths from 17 to 31 millimetres, each with a numeral at the head, the title reading downward, the author, and a ring mark at the foot.',
      caption: 'The whole library. Spines 17 to 31 mm, one set of positions.'
    },
    {
      type: 'metrics',
      heading: 'By the numbers',
      items: [
        { value: '€0.34', label: 'Cost of each jacket, against €0.71 for Ostra’s old four-colour laminate' },
        { value: '1,540', label: 'Average first-year copies a title, up from 610' },
        { value: '7 of 12', label: 'Titles reprinted within sixteen months' },
        { value: '1 die', label: 'For spines from 17 to 31 mm, saving €1,760' }
      ]
    }
  ],
  credits: [
    { role: 'Art direction, jackets, and cut paper', name: 'Noor Castellan' },
    { role: 'Publisher', name: 'Inês Albergaria' },
    { role: 'Series editor', name: 'Tomás Reboredo' },
    { role: 'Production', name: 'Filipa Neto' },
    { role: 'Pressman', name: 'Domingos Sá, Gráfica Sado' },
    { role: 'Translators', name: 'Helen Marchbank, Rui Calder, Ana Fortes, Paul Whitlow, Marta Doyle' }
  ]
};

export default saltLibrary;
