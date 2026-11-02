import { imagesFrom } from '~/content/images';
import type { CaseStudy } from '~/content/types';
import manifest from './pith-quarterly.images.json';

const image = imagesFrom(manifest);

const pithQuarterly: CaseStudy = {
  slug: 'pith-quarterly',
  title: 'Pith Quarterly',
  kind: 'Food quarterly',
  headline: 'A Food Magazine Too Poor for Photographs Cuts Its Own Tomatoes',
  deck: 'With no money for a single shoot, an independent Lisbon quarterly built twelve issues on scissors, spot ink and a recipe page you can read from the chopping board.',
  client: 'Mesa Comum',
  year: 2026,
  role: 'Art director, from launch',
  disciplines: ['Art direction', 'Editorial design', 'Illustration'],
  outcome:
    'The print run grew from 3,500 to 11,200 copies over twelve issues, with illustration costing €2,100 an issue against a €45,000 quote for photography.',
  excerpt:
    'A food magazine lives on photographs, and one day of shooting in Lisbon cost more than Pith could spend on an entire issue. So there are none. Every tomato in the magazine is cut from paper, scanned and filled with spot ink, and every recipe is set large enough to read from a chopping board with flour on your hands. Twelve issues later the print run has more than tripled.',
  order: 5,
  cover: {
    image: image('cover'),
    alt: 'Four Pith covers on a cream field: citrus on pine green, broad beans on pink, tomatoes on yellow, sardines on rust.',
    caption: 'One year of Pith: Nº 9 to Nº 12, each with its own four inks.'
  },
  plate: {
    image: image('plate'),
    alt: 'Pith Nº 9 cover: a huge cut-paper orange half, a blood orange and two lemons on pine green under a cream masthead.',
    caption: 'Pith Nº 9, Winter 2025.'
  },
  blocks: [
    {
      type: 'text',
      dropCap: true,
      paragraphs: [
        'Teresa Amaral cooked in a hospital canteen for eleven years. Duarte Lobo subedited a business daily until it closed. In February 2023 they came to my studio with €41,000 from a family loan and a flat plan for a 148-page quarterly about what people actually eat: canteens, packing sheds, works lunches, the soup nobody writes down. No restaurants, no chefs, no one photographed holding a fish.',
        'I asked what they had budgeted for photography. They had not. I got a quote from a Lisbon photographer I trust: one day, with a food stylist, an assistant and the shopping, came to €3,800. A magazine of that length needs about twelve such days, so the pictures alone would cost €45,000 an issue. They had money for less than one.[1]',
        'That settled the art direction before we had a typeface. *Pith* would have no photographs at all, and it would need to be more appetising than the magazines that did. The team was two people, plus me for three weeks a quarter and whichever illustrator we could persuade.'
      ],
      notes: [
        'The quote was fair. Food takes a long time to photograph, and most of it has to be cooked twice.'
      ]
    },
    {
      type: 'full-image',
      image: image('essay-spread'),
      alt: 'Double-page essay opening: a cut-paper orange half fills the left page; the right page is titled The Orange Is Mostly Not Orange.',
      caption:
        'Nº 9, pages 22 and 23. The essay opens on the same orange as the cover, cropped hard, so the reader arrives inside it.'
    },
    {
      type: 'quote',
      text: 'We asked what a food photograph costs. Noor said, about one issue. That was the whole art direction meeting.',
      attribution: 'Teresa Amaral, editor'
    },
    {
      type: 'text',
      heading: 'A cover you can read from the far side of a shop',
      paragraphs: [
        'Independent magazines are sold face-out, on a shelf of other independent magazines, most of them pale and tasteful. We went the other way: four spot inks per cover, chosen for the season and owned by it, printed on uncoated white board with two passes of the ground colour so that it stays dense. The masthead is 462 points on a page 165 mm wide, because the word has to do all the work of a logo we could not afford to promote.',
        'Each cover carries one ingredient at a size slightly too large for the format, and two lines of italic. No barcode on the front, no list of contents, no fourteen reasons to buy. The yellow of Nº 11 cost us an extra €600 at press and Duarte has mentioned it at every meeting since.'
      ]
    },
    {
      type: 'gallery',
      items: [
        {
          image: image('cover-spring'),
          alt: 'Pith Nº 10 cover: open and closed broad bean pods on pink under a dark green masthead.',
          caption: 'Nº 10, Spring. Four inks, one of them pink.'
        },
        {
          image: image('cover-summer'),
          alt: 'Pith Nº 11 cover: red, orange and green tomatoes, whole and halved, on bright yellow under a red masthead.',
          caption: 'Nº 11, Summer. The €600 yellow.'
        },
        {
          image: image('cover-autumn'),
          alt: 'Pith Nº 12 cover: five blue sardines stacked head to tail on rust under a cream masthead.',
          caption: 'Nº 12, Autumn. Five fish, each cut once, printed twice.'
        }
      ]
    },
    {
      type: 'text',
      heading: 'Why paper',
      paragraphs: [
        'I tried three illustrators on the same brief: draw a lemon that makes me hungry. Line work looked like a cookbook from 1974. Digital painting looked like a stock image of a lemon. Marta Quintal sent back a lemon cut from four pieces of coloured paper with a scalpel, slightly wrong at one end, and everyone in the room wanted to eat it.[1]',
        'Cut paper also solved the arithmetic. Marta cuts each object once, by hand, in about ninety minutes, then scans the pieces at 1200 dpi. I close the shapes and fill each one with a flat spot ink, so a tomato can change colour with the season without being redrawn. After twelve issues the library holds 340 cut objects, and an issue typically needs about thirty new ones. Illustration costs €2,100 an issue.[2]',
        'A flat shape forgives nothing, so most of the craft went into silhouettes. A halved tomato only reads if its seed pockets are uneven. A fish only reads if its belly is left as bare paper.'
      ],
      notes: [
        'She had trained as a theatre set painter. Nobody at Mesa Comum had heard of her, which was reflected in the fee, and has since been corrected.',
        'Reprinting an old cut is free. The sardine on page 97 of Nº 12 also appears in Nº 3, Nº 7 and on the side of a van.'
      ]
    },
    {
      type: 'full-image',
      bleed: true,
      image: image('still-life'),
      alt: 'Cut-paper table seen from above: grilled sardines on a plate on a blue gingham cloth, with tomatoes, lemons, bread and a knife.',
      caption:
        'The Nº 12 opener, built from 23 objects already in the library. Marta cut two new pieces for it: the knife and the gingham.'
    },
    {
      type: 'full-image',
      image: image('layers'),
      alt: 'Instruction sheet on cobalt blue showing a tomato half separated into skin, flesh, seed pockets, seeds and core, with the assembled result.',
      caption:
        'The house template for a cut tomato, from the 40-page illustration guide we wrote so that the method survives any one of us.'
    },
    {
      type: 'quote',
      text: 'A tomato takes ninety minutes. The sardine took three weeks, because it kept looking pleased to see you.',
      attribution: 'Marta Quintal, illustrator'
    },
    {
      type: 'text',
      heading: 'The recipe, at arm’s length',
      columns: 2,
      paragraphs: [
        'A printed recipe gets read from the wrong distance, with the wrong hands. Most magazines set them at 8 or 9 points in a narrow column beside a large picture, and assume you have memorised the thing by the time the onions go in.',
        'Before designing anything I printed one method at five sizes and taped them to the tiles in Duarte’s kitchen. He stood at his chopping board, 90 cm away, with flour on his hands and a pan going, and read each one aloud. He lost his place at 9 points, at 10, and at 12 in the light weight. At 13.5 on 17 he stopped squinting.',
        'That size has consequences. A recipe now takes a full page, sometimes two, so the 16-page recipe section sits at the centre of each issue on a heavier 120 gsm stock that can survive being wiped once. Quantities are set in a sans serif in their own left column, always before the ingredient, because that is the part you look up with a spoon in your hand. The method never turns a page.',
        'Helena Moura tests every recipe twice in a domestic oven, and we print what she found, including the failures. The italic is reserved for opinion. If a line is in italic you may ignore it, and the food will still work.'
      ]
    },
    {
      type: 'full-image',
      bleed: true,
      image: image('recipe-spread'),
      alt: 'Recipe spread: cut-paper grilled sardines on tomato toast on cobalt blue, facing a large-type recipe titled Sardines on yesterday’s bread.',
      caption:
        'Nº 12, pages 96 and 97. Six steps, eight ingredients, no page turn. The picture is there to make you hungry and the type is there to feed you.'
    },
    {
      type: 'text',
      heading: 'Type and paper',
      paragraphs: [
        'Everything is set in Fraunces, with its softness axis at maximum for titles and method.[1] Soft serifs suit uncoated stock, where ink spreads and sharp corners turn fuzzy anyway, and the wonky italic has the slightly overfed quality I wanted from the start. Hanken Grotesk appears only for quantities and folios.',
        'The format is 165 by 264 mm, tall enough for a column of method and narrow enough to prop against a backsplash. Sections are thread-sewn on a 1.3-bulk natural text stock, so an open issue stays open on a counter without a jar on it.',
        'The last eight pages are unbleached kraft and hold a cumulative index of every ingredient in every issue, reset each quarter. It began as a way to use up the end of a signature. It is now the most-mentioned page in reader letters, and the reason people keep buying the back issues.[2]'
      ],
      notes: [
        'Open-licensed, which helped. We had budgeted nothing for type either.',
        'One reader in Porto wrote in to ask why water had been left out. It is now in the introduction.'
      ]
    },
    {
      type: 'full-image',
      image: image('palette-paper'),
      alt: 'House sheet with four columns of spot-ink swatches for each season, four paper stocks, and type specimens at actual size.',
      caption:
        'The house sheet, revised each March. It fits on one page so that a new printer can quote from it without a meeting.'
    },
    {
      type: 'image-pair',
      items: [
        {
          image: image('beans'),
          alt: 'A Field Guide to Beans: a grid of 24 labelled cut-paper beans, each on its own flat colour.',
          caption: 'Nº 10, page 74. Twenty-four beans at twice life size. The chickpea is included under protest.'
        },
        {
          image: image('index-spread'),
          alt: 'Back-of-book index titled Everything, by ingredient, in four columns, beside a green panel of cut-paper food.',
          caption: 'The cumulative index, from Almonds to Yeast. Entries in italics are arguments.'
        }
      ]
    },
    {
      type: 'text',
      heading: 'What happened',
      paragraphs: [
        'Nº 1 appeared in December 2023 in a run of 3,500. Nº 12 printed 11,200, sold in 140 shops across nine countries, with 4,060 of them going to subscribers. Issues 1 to 7 are out of print. In last year’s reader survey, 62 percent of respondents had cooked something from the latest issue within a week of buying it, which is the only number Teresa has ever asked me to frame.',
        'The magazine has never run a photograph. We have been offered several, for free, and said no. Two people still make it, and the method has outlived one printer and a change of paper mill without anyone needing to redraw a tomato.'
      ]
    },
    {
      type: 'metrics',
      heading: 'By the numbers',
      items: [
        { value: '11,200', label: 'copies of Nº 12, from 3,500 of Nº 1' },
        { value: '€2,100', label: 'illustration per issue, against €45,000 for photography' },
        { value: '340', label: 'cut-paper objects in the library' },
        { value: '62%', label: 'of surveyed readers cooked from an issue within a week' }
      ]
    }
  ],
  credits: [
    { role: 'Art direction and design', name: 'Noor Castellan' },
    { role: 'Editor', name: 'Teresa Amaral' },
    { role: 'Publisher and subeditor', name: 'Duarte Lobo' },
    { role: 'Cut-paper illustration', name: 'Marta Quintal' },
    { role: 'Recipe testing', name: 'Helena Moura' },
    { role: 'Contributing writer', name: 'Inês Tavora' },
    { role: 'Printing', name: 'Tipografia Alvorada, Setúbal' }
  ]
};

export default pithQuarterly;
