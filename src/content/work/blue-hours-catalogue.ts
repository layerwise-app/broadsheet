import { imagesFrom } from '~/content/images';
import type { CaseStudy } from '~/content/types';
import manifest from './blue-hours-catalogue.images.json';

const image = imagesFrom(manifest);

const blueHours: CaseStudy = {
  slug: 'blue-hours-catalogue',
  title: 'Blue Hours',
  kind: 'Museum catalogue',
  headline: 'Five Centuries of Blue, Held to a Single Ink',
  deck: 'A 416-page catalogue of painted tiles for the Museu da Ribeira, where one custom cobalt had to pass for every workshop from 1510 to 1998.',
  client: 'Museu da Ribeira, Lisbon',
  year: 2026,
  role: 'Art direction and book design',
  disciplines: ['Art direction', 'Book design', 'Information design'],
  outcome:
    'The first printing of 3,500 sold out in fourteen weeks, and the museum’s conservators now use the plates as their colour reference.',
  excerpt:
    'Four-colour process cannot print the blue of a Lisbon tile. It falls outside the gamut by a visible margin, and on matte paper the margin grows. The Museu da Ribeira wanted 212 plates that a conservator could hold against the wall. Eleven weeks before press, with five lenders still undecided, we started mixing ink at a printer’s in Almada at twenty to seven in the morning.',
  order: 3,
  cover: {
    image: image('cover'),
    alt: 'Back and front covers of Blue Hours laid flat on deep cobalt. The front is a wall of star-and-cross tiles with blank tiles left where the title sits; the back is all blanks but one.',
    caption: 'Printed boards, 240 × 320 mm. The title occupies the kind of blank fill the museum’s conservators use for lost tiles.'
  },
  plate: {
    image: image('plate'),
    alt: 'Front cover of Blue Hours: blue and bone star-and-cross tiles, with the title in dark cobalt on a block of eight blank tiles.',
    caption: 'Front board, with the Cais panel’s two blank tiles as its precedent.'
  },
  blocks: [
    {
      type: 'text',
      dropCap: true,
      heading: 'The brief',
      paragraphs: [
        'The Museu da Ribeira holds the largest public collection of painted tile on the Tagus, and in 2023 it decided to show all of it at once, or as near as the walls allowed. *Blue Hours* opened in September 2026 with 306 objects from thirty-one lenders. Inês Valadão, who curated it, asked me for a catalogue that would still be useful when the show had gone back into its crates.',
        'Useful had a precise meaning for her. Her conservators keep a shelf of tile catalogues and do not trust any of them for colour.[1] A book that reproduced the blue accurately would be consulted for decades. A book that reproduced it the way most books do would be admired for a season and then shelved with the others.',
        'So the brief was one sentence on a sheet of museum letterhead: the reader should be able to hold plate 63 against tile 63. The rest of the job followed from that sentence, including the parts that nearly sank it.'
      ],
      notes: [
        'The conservation lab’s test: open the book at a tile they know, under the same lamp, beside the object. Of the eleven catalogues on the shelf, none passed.'
      ]
    },
    {
      type: 'full-image',
      bleed: true,
      image: image('panel-harbour'),
      alt: 'A panel of two hundred tiles painted in cobalt: a harbour with a hillside town, three ships under sail, porters and merchants on the quay, framed by a running acanthus border with a cartouche reading O Cais da Ribeira, 1738.',
      caption: 'Plate 112, *O Cais da Ribeira*, Fábrica da Ribeira Velha, 1738. Twenty tiles by ten, reproduced across a gatefold.'
    },
    {
      type: 'text',
      heading: 'The constraint',
      columns: 2,
      paragraphs: [
        'Cobalt on tin glaze sits outside what cyan and magenta can reach. On a gloss sheet the miss is tolerable. On a matte sheet, which we needed so that the text pages and plates would feel like one book, the blue dulls and drifts toward violet.[1] We were printing on Serra Matte Art at 150 gsm because the museum had a paper grant, and that decision could not be reopened.',
        'The press was a five-colour, so four process units and one free. I took a single reference, inventory MR 2204, a star-and-cross tile from about 1610, and asked João Macedo at Tipografia do Almada to mix against it. We drew down six candidates on 11 March. Stock reflex blue read as ballpoint. Reflex with black was close and printed heavy. Mix E, a reflex warmed with rhodamine and let down with 4% transparent white, came in at ΔE 1.4 against the object at 1.70 density.',
        'Every plate then went through a separate cobalt channel, built by hand by Bruno Saraiva from the raw captures. Five centuries of workshop blues were to be rendered by one ink and its tints, with process colour supplying only the antimony yellows, the manganese browns, and the shift in temperature between a Seville tile and a Porto one.[2] The alternative was a second spot for the earlier work, and the budget allowed for one.',
        'The schedule was the other wall. Text was due on 14 March and files on 30 May, which is eleven weeks for 416 pages, and five lenders had not yet confirmed. We would be imposing a book whose plates could still change.'
      ],
      notes: [
        'Measured on the first drawdown: process cobalt on this stock landed 6.8 ΔE from the tile, and the error was all in the shadows.',
        'Mix F, with 3% process cyan, would have suited the pre-1650 group better. Inês and I looked at it for an hour and left it out. One ink was the argument of the book.'
      ]
    },
    {
      type: 'full-image',
      image: image('proofs'),
      alt: 'A press drawdown sheet with six solid blues labelled A to F, each with a tint scale and a printed tile. Mix E is ringed in red pencil; below it the original tile and the printed tile sit side by side beside a table of readings.',
      caption: 'Drawdown sheet 7 of 9, Tipografia do Almada, 11 March, signed off at 06:55.'
    },
    {
      type: 'quote',
      text: 'I took plate 63 down to the store with a lamp and the tile. I have never been able to do that with a book before, and I keep doing it.',
      attribution: 'Inês Valadão, curator, Museu da Ribeira'
    },
    {
      type: 'text',
      heading: 'A grid for loans that had not arrived',
      paragraphs: [
        'A catalogue normally fixes its plates and pours text around them. We could not do that, so the structure was built to absorb change at the level of the page and never above it. The book is 26 signatures of 16 pages, A to Z, which made the flatplan a sheet you could read on a wall.[1] Plates share one 24-unit grid with a shared baseline for captions, and any plate slot accepts any shape: full page, half, a pair, or a block of four. A portrait panel replaced by a landscape one takes the same slot with no change to the page before or after it.',
        'Captions were data, kept in a spreadsheet Tobias Reuter’s team edited directly and linked to the layout by catalogue number. When a lender in Évora withdrew a panel on 6 May and a private collector offered a better one nine days later, the replacement took one afternoon and touched two pages.',
        'The last confirmation came on 22 May. Between 1 May and press, 14 pages changed. No signature was reimposed, and pagination held from version 19 of the flatplan to version 31, so the index we had compiled in April remained correct.'
      ],
      notes: [
        'The index is why this mattered. Tile scholars read a catalogue through its index, and an index rebuilt in the final fortnight is an index with errors in it.'
      ]
    },
    {
      type: 'full-image',
      image: image('flatplan'),
      alt: 'A flatplan of the whole book: 416 miniature pages in 26 rows lettered A to Z, showing essays, plates, and catalogue entries in different blues. Fourteen pages are marked in ochre as late changes.',
      caption: 'Flatplan, version 31. Ochre marks the 14 pages changed after 1 May.'
    },
    {
      type: 'image-pair',
      items: [
        {
          image: image('essay-opening'),
          alt: 'A book spread. On the left, a close view of a painted ship from the Cais panel, cut by tile joints; on the right, an essay titled What the Cobalt Remembers in two justified columns with footnotes.',
          caption: 'Essay openings take a detail at four times life size, with the joints left in.'
        },
        {
          image: image('carpet-spread'),
          alt: 'A book spread: a carpet of blue pomegranate tiles fills most of the opening, and a narrow column on the right gives the title, a single tile at actual size, and a table of data.',
          caption: 'Plate 73. The data table sits in the same position on all 212 plates.'
        }
      ]
    },
    {
      type: 'text',
      heading: 'Reading by ink, and the cover',
      paragraphs: [
        'Marta Quintela’s essay on the chemistry of cobalt changed the order of the book. Her analysis of 1,140 fragments, with Oluwaseun Adeyi, showed that attributions made by drawing and attributions made by trace elements often disagreed. We gave that finding a structure. Plates 41 to 88 run by cobalt source and not by date, across forty-eight openings, and Appendix C charts every workshop against the ore it bought, so a reader can see a shortage arrive in the paint.',
        'The entries went the other way, into rigid order. Tile data is dull and exact, so it gets a dull and exact format: number, title, workshop, date, materials, millimetres, inventory. Four to a page, 306 objects, no decoration.',
        'The cover came from the conservation lab. When a tile is lost the museum does not paint a replica. It sets a blank, glazed but undecorated, so that no one will ever mistake the repair for the original. The Cais panel has had two since a fall in 1931. I laid a star-and-cross wall across the boards and left blanks where the title goes. The back cover inverts it, with one surviving tile among forty-seven blanks. The boards are printed in mix E, so the book’s argument is the first thing in your hands.'
      ]
    },
    {
      type: 'gallery',
      items: [
        {
          image: image('tile-aresta'),
          alt: 'A Seville pressed tile in blue, yellow, green and brown, with interlaced bands around a central lozenge, photographed with a scale bar.',
          caption: 'Cat. 61, the earliest tile in the book, one of forty needing yellow from process.'
        },
        {
          image: image('tile-star'),
          alt: 'A blue star-and-cross tile with a bone-white eight-pointed star and central rosette, photographed with a scale bar.',
          caption: 'Cat. 63, inv. MR 2204, the reference for the whole print run.'
        },
        {
          image: image('tile-albarrada'),
          alt: 'A tile painted with a two-handled vase of flowers in blue with one touch of yellow, photographed with a scale bar.',
          caption: 'Cat. 65, albarrada. The vase is cobalt at full strength, the leaves a 40% tint.'
        },
        {
          image: image('tile-ship'),
          alt: 'A Dutch single-figure tile painted with a two-masted ship and small corner ornaments, photographed with a scale bar.',
          caption: 'Cat. 66. Rotterdam’s blue is colder; the fifth ink holds it and process warms the rest.'
        }
      ]
    },
    {
      type: 'image-pair',
      items: [
        {
          image: image('entries'),
          alt: 'A catalogue page with nine numbered tiles in a three-by-three grid, from a Seville geometric tile to a 1998 facade tile, each with workshop, date, dimensions, and inventory number.',
          caption: 'Entries 61 to 69, from a sample sheet shown to lenders. The book runs four to a page.'
        },
        {
          image: image('timeline'),
          alt: 'A chart of nine workshops across five hundred years, with bars coloured by the cobalt source identified in their work, event markers for 1704, 1755, 1834 and 1962, and a six-step provenance of the Cais panel.',
          caption: 'Appendix C. The pale block in 1756 is the wartime shortage, visible in the paint.'
        }
      ]
    },
    {
      type: 'quote',
      text: 'We ran that fifth unit for nineteen days. By the end the operators could tell a bad sheet from across the floor, before the spectro said anything.',
      attribution: 'João Macedo, press manager, Tipografia do Almada'
    },
    {
      type: 'metrics',
      heading: 'At press and after',
      items: [
        { value: 'ΔE 1.6', label: 'Average distance from object to plate, across 212 plates; worst case 2.4' },
        { value: '14', label: 'Pages changed after 1 May, with no signature reimposed' },
        { value: '3,500', label: 'Copies in the first printing, sold out in fourteen weeks' },
        { value: '11', label: 'Weeks from final text to press, four days inside the schedule' }
      ]
    },
    {
      type: 'text',
      heading: 'The result',
      paragraphs: [
        'We spot-read every plate against its object or a calibrated capture. The average across 212 plates was ΔE 1.6, with a worst case of 2.4, on a 1962 Metro tile whose blue comes from a refined oxide, which I should have flagged sooner. The first printing of 3,500 sold out in fourteen weeks at a museum shop that had hoped to sell it over two years, and a second printing of 2,000 went on press in the same ink, from the same recipe card.',
        'The result I value most is a small one. In January the conservation lab asked for ten unbound sets of the plates. They now pin them up beside the bench as a colour reference, which is the sentence on the letterhead, carried out by the people who wrote it.'
      ]
    }
  ],
  credits: [
    { role: 'Art direction and design', name: 'Noor Castellan' },
    { role: 'Editors', name: 'Inês Valadão and Tobias Reuter' },
    { role: 'Cobalt separations', name: 'Bruno Saraiva' },
    { role: 'Object capture', name: 'Leonor Faria' },
    { role: 'Press', name: 'João Macedo, Tipografia do Almada' },
    { role: 'Production', name: 'Camila Duarte' },
    { role: 'Type', name: 'Cormorant Garamond, EB Garamond, Hanken Grotesk' }
  ]
};

export default blueHours;
