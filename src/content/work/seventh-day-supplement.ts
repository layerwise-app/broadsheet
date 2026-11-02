import { imagesFrom } from '~/content/images';
import type { CaseStudy } from '~/content/types';
import manifest from './seventh-day-supplement.images.json';

const image = imagesFrom(manifest);

const seventhDay: CaseStudy = {
  slug: 'seventh-day-supplement',
  title: 'Seventh Day',
  kind: 'Sunday newspaper supplement',
  headline: 'Sunday Section Stops Apologising for Newsprint',
  deck: 'A 42-year-old weekend tabloid, a coldset press at 40 lines an inch, and a staff of three who had to stop being polite about all of it.',
  client: 'The Northern Ledger',
  year: 2024,
  role: 'Art director, with Hanne Bakke as section designer',
  disciplines: ['Art direction', 'Editorial design', 'Information design'],
  outcome:
    'Readers who opened the section rose from 31 to 58 per cent in 26 weeks, on the same press, the same paper and the same staff of three.',
  excerpt:
    'Most readers of The Northern Ledger opened its Sunday section from the back, if they opened it at all. The press could hold 40 lines an inch and one spot colour, editorial closed on Thursday and ads could land until Friday at four. So the redesign stopped hiding the newsprint. Wood-type headlines, one ink a week, drawings made for the dots, and every feature built three times.',
  order: 4,
  cover: {
    image: image('cover'),
    alt: 'Three Seventh Day section fronts stepped across a black field: a red front showing crossed leeks, a blue front showing a trawler aground on mud, and a yellow front showing a bus on a dark road.',
    caption: 'Three weeks, three inks: the fronts for 15, 22 and 29 September 2024.'
  },
  plate: {
    image: image('plate'),
    alt: 'Seventh Day front page with the headline The Great Leek War in huge black capitals over red, above two leeks crossed like swords and a starburst reading 7lb 4oz.',
    caption: 'The launch front, in Post Box red.'
  },
  blocks: [
    {
      type: 'text',
      dropCap: true,
      paragraphs: [
        '*Seventh Day* had been the back section of *The Northern Ledger* since 1982, and by 2023 it was where readers went to find the crossword. Ines Whitlock, the editor, rang me in November with a number: 31 per cent of people who took the Sunday paper opened the section at all, and most of those opened it from the back.[1] Her brief fitted on a postcard, and she sent it on one. Make it the first thing taken out of the paper and fought over. Don’t ask for more pages, more staff or better paper, because there aren’t any.',
        'I flew up and spent two weekends at the kitchen tables of nine readers who had agreed to be stared at. What I learned was unflattering to my trade. The old section was dressed as a weekend magazine, with a thin serif, soft colour and a lot of air. On newsprint the air turned grey and the colour turned to mud. Nobody disliked it. They put it on the pile with the car supplement.'
      ],
      notes: [
        'From the Ledger’s own reader panel of 1,204 households. A section counts as opened if the reader can describe one thing in it a day later.'
      ]
    },
    {
      type: 'image-pair',
      items: [
        {
          image: image('plate'),
          alt: 'Red and newsprint front page headed The Great Leek War, with two crossed leeks drawn in black cut shapes and coarse dots.',
          caption: 'No. 2,214, in Post Box. The leeks are duelling because the story is about a man with a spade.'
        },
        {
          image: image('front-tide'),
          alt: 'Newsprint and blue front page headed Who Stole the Tide?, with a black trawler keeled over on dotted mud beneath a striped sun.',
          caption: 'No. 2,215, in Harbour. The sun is a knockout; the mud is the only tint on the page.'
        }
      ]
    },
    {
      type: 'text',
      heading: 'The press gets a vote',
      columns: 2,
      paragraphs: [
        'Every decision afterwards came from the machine. The Ledger prints coldset web offset at its plant on the Ald: 186,000 copies on 45 gsm newsprint, running from ten on Saturday night. Coldset ink dries by soaking in, so dots spread by about 30 per cent, and the finest screen worth asking for is 40 lines per inch. At that coarseness you can see the dots from across a table. The section gets one spot colour plus black, and the two plates can drift a full point out of register at speed.',
        'The calendar was worse. Editorial closed at noon on Thursday. Ad sales held the right to sell space until four on Friday, and could put it almost anywhere. The staff was three people: Ines, a chief sub called Tom Garrity, and one designer, Hanne Bakke, who had been making 36 pages a week alone for six years and was owed a holiday.',
        'So I stopped treating the press as a thing to be hidden. A magazine look asks newsprint to be something else. A tabloid look asks it to be newsprint, only louder.'
      ]
    },
    {
      type: 'full-image',
      image: image('system-sheet'),
      alt: 'A printed rules sheet with the Seventh Day nameplate across the top, four colour swatches named Post Box, Harbour, Custard and Allotment, a strip of halftone tints from 10 to 100 per cent, type specimens and three page layouts.',
      caption: 'The house rules, on one sheet, pinned above the subs’ desk.'
    },
    {
      type: 'text',
      heading: 'Loud on purpose',
      paragraphs: [
        'The nameplate went first. It is set in Alfa Slab One, a face with wood type in its bones, as wide as the page allows, and it never moves. Beneath it every front carries one story and one headline in Anton, capitals only, set to fill the measure. Filling the measure means the subs write to a character count, which Tom resisted for a fortnight and now defends in pubs.[1]',
        'Then the colour. One spot a week, chosen by Ines on Monday from a list of four, each with a loose job: Post Box for scandal and court dates, Harbour for the sea and the council, Custard for transport and puzzles, Allotment for listings and the soil. Readers learned the colours faster than we expected. By Christmas the newsagent on Bank Street was being asked whether this was a red one.[2]',
        'The illustrations changed most. We had no picture budget and no photographer, and photographs at 40 lines fill in. So I drew for the screen, in cut shapes of black and spot with coarse halftone doing the modelling. Black always overprints the spot and never knocks out of it, which hides the register drift. If the leek on the front looks like a linocut from 1936, that is the press talking.'
      ],
      notes: [
        'The rule: count first, then write. A headline that misses by two characters gets rewritten. It does not get tracked.',
        'A small survey, conducted by asking the newsagent. He also told us what readers thought of the crossword, at length.'
      ]
    },
    {
      type: 'quote',
      text: 'I told Noor a headline isn’t a shape. Now I count on my fingers at weddings.',
      attribution: 'Tom Garrity, chief sub, The Northern Ledger'
    },
    {
      type: 'full-image',
      bleed: true,
      image: image('spread-leek'),
      alt: 'A double-page newspaper spread headed The Great Leek War, with one huge leek drawn in black cut shapes and halftone dots running across a red band and over the gutter, above five columns of text and a carpet advertisement.',
      caption:
        'Pages 8 and 9, No. 2,214. The leek crosses the gutter at the shank, the one place where a misaligned fold costs nothing.'
    },
    {
      type: 'text',
      heading: 'Three layouts, one page',
      paragraphs: [
        'The Friday problem needed a system more than a style. Under the old arrangement a late ad meant Hanne redrawing a page at five o’clock while a sub cut copy down the phone. Fourteen times in 2023 a page went to plate with a hole in it or a story that stopped mid-sentence, and twice the printer re-plated at the paper’s expense.',
        'I split the page into six columns and twelve decks, and ad sales agreed to sell only in those units. Then every feature gets built three times by Thursday noon. Layout A assumes no ad. Layout B assumes a quarter page. Layout C assumes a half plus an upright, which is the worst thing they have ever sold us. The drawing is made to crop at known lines, the headline has a second size already written, and Tom marks a cut in advance. On Friday, whoever is at the desk picks a letter. Nobody has to be phoned.',
        'It sounds like three times the work. It costs about 40 minutes a feature, because the three layouts share one grid and one block of copy, and Hanne has her Friday afternoons back.'
      ]
    },
    {
      type: 'full-image',
      image: image('ad-float'),
      alt: 'The same page shown three times on black: with no advertising, with a quarter-page carpet advert, and with a half-page undertaker’s advert plus a tall bakery advert, the bus drawing shrinking each time.',
      caption: 'One page at three deadlines. The sub picks a letter; the words stay where they were written.'
    },
    {
      type: 'text',
      heading: 'The back of the book',
      columns: 2,
      paragraphs: [
        'People had been opening the section from the back for forty years, so I gave them more to come back for. The crossword moved to a full page with a sudoku, a word ladder and the answers printed upside down, under the name The Long Sit Down. The listings became a real grid, drawn to scale at 15 minutes a row, so a three-hour western looks like three hours of your life. Dora Hallam watches what she can and prints the result in green.[1]',
        'Then we added a page that had never existed: one chart, every week, on a subject no one had asked about. The first was Where the Sunday Goes, built from the diaries of 1,204 readers. A press like this offers very little to separate nine categories with, so the chart uses what is there: black, spot, two dot screens and two line screens. It became the most cut-out page in the section. We know because people post it back with corrections.'
      ],
      notes: [
        'Drawn listings are slower to make. Hanne’s template pulls times from the broadcasters’ data on Wednesday night, and Dora adds the insults on Thursday morning.'
      ]
    },
    {
      type: 'gallery',
      items: [
        {
          image: image('front-bus'),
          alt: 'Yellow front page headed The Last Bus to Nowhere, with a cream and black bus on a dark road and a single yellow passenger in one window.',
          caption: 'No. 2,216, in Custard. One passenger, for a route that averaged nine.'
        },
        {
          image: image('chart-sunday'),
          alt: 'A full-page chart titled Where the Sunday Goes, stacking nine activities by the hour in blue, black, dots and stripes, with a smaller line chart of Monday dread peaking at 21.40.',
          caption: 'The first weekly chart. Dread peaks at 21.40, at 92 per cent.'
        },
        {
          image: image('puzzles'),
          alt: 'A puzzle page headed The Long Sit Down, with an empty 11 by 11 crossword and its clues, a sudoku, a word ladder from LOAF to MEAT, an undertaker’s advert and upside-down answers.',
          caption: 'The Long Sit Down. The crossword and sudoku both solve; a reader would write in.'
        },
        {
          image: image('listings'),
          alt: 'A listings page headed Tonight, and Why, with a five-channel television grid drawn to scale from 6pm to midnight, green blocks for recommended programmes, local events and a tide table.',
          caption: 'Listings at 15 minutes a row, with the tide table for a harbour that has no water in it.'
        }
      ]
    },
    {
      type: 'quote',
      text: 'My husband now takes it out of the paper before I can get to it. There has been shouting.',
      attribution: 'Janet Oyelaran, Chapel Row, in a letter to the editor'
    },
    {
      type: 'text',
      heading: 'What happened',
      paragraphs: [
        'The new section launched on 15 September 2024 with the leek war on the front. We had one bad Saturday, when the red came up orange on the first 30,000 copies and nobody complained. After 26 weeks the panel’s read figure had gone from 31 to 58 per cent. Sunday sales, which had fallen for nine years, rose 6.4 per cent and have held. The Friday system took in £212,000 of late advertising in its first year that the old process would have turned away, and pages going to plate with a hole in them went from fourteen to none.',
        'I would change the Custard. Yellow on newsprint goes the shade of old teeth in damp weather, and we have since nudged it towards orange. The section is still three people. Hanne took her holiday in March.'
      ]
    },
    {
      type: 'metrics',
      heading: 'After 26 weeks',
      items: [
        { value: '58%', label: 'of Sunday readers open the section, up from 31%' },
        { value: '+6.4%', label: 'Sunday copy sales, after nine years of decline' },
        { value: '£212k', label: 'late advertising the Friday system could accept in year one' },
        { value: '0', label: 'pages sent to plate with a hole in them, down from 14 in 2023' }
      ]
    }
  ],
  credits: [
    { role: 'Art direction and illustration', name: 'Noor Castellan' },
    { role: 'Section design', name: 'Hanne Bakke' },
    { role: 'Editor', name: 'Ines Whitlock' },
    { role: 'Chief sub', name: 'Tom Garrity' },
    { role: 'Words', name: 'Dora Hallam, Sam Ouseley, Mina Clough' },
    { role: 'Crossword', name: 'Ploughman' },
    { role: 'Press', name: 'Ledger Print, Aldmouth' }
  ]
};

export default seventhDay;
