import { imagesFrom } from '~/content/images';
import type { CaseStudy } from '~/content/types';
import manifest from './margem-programme.images.json';

const image = imagesFrom(manifest);

const project: CaseStudy = {
  slug: 'margem-programme',
  title: 'Margem',
  kind: 'Film festival programme',
  headline: 'Eighty-Four Films, Four Rooms and a Programme You Can Read in the Dark',
  deck: 'A river-town festival asked for a pocket book a stranger could use in a queue at night, with a timetable that kept moving until two days before press.',
  client: 'Margem, Festival de Cinema de Alvarim',
  year: 2025,
  role: 'Art direction and editorial design',
  disciplines: ['Art direction', 'Editorial design', 'Identity', 'Information design'],
  outcome:
    'Volunteers timed strangers finding a screening in 11 seconds, against 31 with the old programme, and the box office logged 61 percent fewer questions about where and when.',
  excerpt:
    'Margem runs nine days on the Rio Sorna, in a cinema, a grain store, a garden and a moving ferry. Most of its audience reads the programme standing outside at night, by the light of a phone. The twelfth edition asked for 84 films and 168 screenings in 96 pocket pages, set in a timetable that could change until 41 hours before the plates were made.',
  order: 6,
  cover: {
    image: image('cover'),
    alt: 'A hoarding of black and amber Margem posters pasted edge to edge in staggered columns, each with the word MARGEM in very tall letters under a halftone night scene.',
    caption: 'The five section posters on the hoarding at the Cais do Sal, week of 22 September.'
  },
  plate: {
    image: image('plate'),
    alt: 'Black poster with two figures under a quay lamp printed in amber halftone, the section title Competição, and MARGEM in tall amber letters filling the lower half.',
    caption: 'Competição, one of five section posters. Two inks, 700 × 1000 mm.'
  },
  blocks: [
    {
      type: 'text',
      dropCap: true,
      paragraphs: [
        'Beatriz Lobo has directed Margem for seven of its twelve years, and she opened our first meeting by putting the previous programme on the table with a phone lying on top of it, torch on. That, she said, was how the book was read. The festival happens in Alvarim in October, when the sun is down by seven, and its four rooms are spread along a river with no foyer worth the name.[1] People stand in a queue on the quay and try to work out whether they can make the 21:30 in the grain store after the film they are about to see.',
        'The old programme was a 148-page A5 paperback, handsome on a desk, with essays at the front and the timetable on page 112. Her brief fitted on one line of a text message: *a book a stranger can use in the dark in a queue.* I took the job on the condition that the essays could go online.'
      ],
      notes: [
        'Room A, the Cine-Teatro, has a foyer that holds forty. Room C is a ferry and has a gangway.'
      ]
    },
    {
      type: 'full-image',
      image: image('programme-covers'),
      alt: 'Flat cover sheet of the programme: an amber back cover listing the four rooms, prices and film sections, a black spine, and a black front cover with MARGEM running sideways up its full height, the letters printed with a halftone river.',
      caption: 'Cover sheet, 115 × 180 mm trimmed. The back cover carries what the queue asks most: rooms, prices, sections.'
    },
    {
      type: 'text',
      heading: 'Ninety-six pages, and not one more',
      paragraphs: [
        'The budget allowed 7,500 copies at €1.84 each, which meant six sixteen-page signatures on one uncoated stock, saddle-stitched, in two inks. Ninety-six pages had to hold 84 films, 168 screenings, nine days of timetable, a map, and the sponsors the festival is contractually obliged to thank. The trim came from a coat: I measured the outside pockets of eleven coats belonging to festival staff, and 115 × 180 mm fitted ten of them.',
        'The harder constraint was time. Films at Margem arrive as 35 mm prints on loan from archives and distributors, and their dates move. In 2024 the timetable changed nineteen times in the last month. Lobo could promise me a frozen list two days before plates and nothing earlier. Whatever I designed had to absorb a late change without anyone reflowing a page at midnight.[1]',
        'So I started with a test in place of a layout. On a September evening we set up on the quay at about eight lux, roughly a street lamp at a distance, and asked passers-by to find a named screening in the 2024 book. The median was 31 seconds, and several people gave up. That number became the only metric I reported to the board.'
      ],
      notes: [
        'The designer of the 2023 edition told me she had done this twice, at midnight, in the print shop.'
      ]
    },
    {
      type: 'quote',
      text: 'I do not need it to be beautiful in the shop. I need it to work when somebody’s partner is already walking away.',
      attribution: 'Beatriz Lobo, festival director'
    },
    {
      type: 'full-image',
      bleed: true,
      image: image('timetable-saturday'),
      alt: 'Amber timetable gatefold for Saturday 4 October: four rows for rooms A to D, hours from 10 to 01 across the top, and black blocks for each screening with its time, title and running time, sized to the length of the film.',
      caption: 'Saturday, Day 2 of 9. Each block is as long as its film, so a gap you can walk across is a gap you can see. Fold lines dashed.'
    },
    {
      type: 'text',
      heading: 'The timetable went first',
      columns: 2,
      paragraphs: [
        'Every earlier Margem programme listed screenings in columns of text, one column per room. Readers had to do the arithmetic themselves to see whether two films overlapped. I drew each day as a chart with four rows, one per room, and with hours running across the page. A block is as long as its running time. Lateness, gaps and clashes are visible without reading a word, and I set the start time larger than the title, at 13 point, because the time is what people are looking for.',
        'A chart of fifteen and a half hours will not fit on a 230 mm spread at any size you could read outdoors, so each day opens on a 58 mm gate, half a page wide, that folds back into the book. The nine gates took a long argument with the printer about imposition and added €0.11 a copy.',
        'The timetable section prints as a solid of Pantone 1235 with black on top. I tested white stock on the quay as well. White read slightly faster under a street lamp and much worse under a phone torch, where it glared, and it left people squinting when they walked into a dark room. Amber also marks the section on the closed book, so nobody has to look for it. Rooms became letters, A to D, printed huge at the start of each row and painted on each door by a signwriter at the height of a head. Nobody at Margem now says “the grain store” to a stranger.'
      ]
    },
    {
      type: 'image-pair',
      items: [
        {
          image: image('entry-ferryman'),
          alt: 'Film entry spread: a full-page black and cream halftone of a figure poling a boat under quay lamps on the left, and on the right the title The Ferryman’s Daughter in tall capitals with credits, a synopsis, and three large screening lines.',
          caption: 'Feature entry, The Ferryman’s Daughter. Three screening lines, always three, always at the foot.'
        },
        {
          image: image('entries-crossings'),
          alt: 'Spread of six short film entries for the Crossings section, each with a square halftone still, title, director, synopsis and two screening times.',
          caption: 'Travessias, the films shown on the ferry. Six entries on a spread, on the same grid.'
        }
      ]
    },
    {
      type: 'text',
      heading: 'A time can change without a page moving',
      paragraphs: [
        'Screenings live in one spreadsheet, kept by the programmer, Vasco Teixeira, and nowhere else. A data merge writes every chart and every film entry from that sheet. The entry layout reserves exactly three screening lines at the foot of the page, whether a film plays once or three times, so a changed time can never push a synopsis onto the next line. A full rebuild of 96 pages took four minutes on my laptop.[1] Teixeira sent the last change 41 hours before plates, swapping two films between Rooms B and C, and we ran it while he was still on the phone.',
        'The stills came from 84 productions in every state: 4K masters, festival-kit JPEGs, one photographed from a monitor. I screened all of them through the same coarse 45-line dot, black only, on purpose. On uncoated stock a fine screen goes to mud, and at 45 lines a phone snapshot and a scan of a print end up belonging to the same book.',
        'To find a day without opening the chart, nine black marks step down the fore-edge, one for each section, with the day number reversed out. Closed, the book shows a staircase. The thumb learns it by the second evening.'
      ],
      notes: [
        'The merge is a plain InDesign data merge plus a forty-line script for the chart blocks. I left both with the festival, along with a page of instructions that their intern has since corrected.'
      ]
    },
    {
      type: 'full-image',
      image: image('thumb-index'),
      alt: 'Nine amber pages side by side on black, one for each festival day, each with a tall day abbreviation, a pattern of black blocks showing that day’s screenings, and a black thumb mark stepping lower page by page. At the right, the closed book’s fore-edge with the same marks as a staircase.',
      caption: 'The nine day openers and, at right, the fore-edge. Friday the 3rd starts at 21:00, and looks it.'
    },
    {
      type: 'quote',
      text: 'By the second night people had stopped asking me where anything was. They asked me where to get a sandwich, which I also know.',
      attribution: 'Filipa Antunes, volunteer coordinator, Cais do Sal'
    },
    {
      type: 'text',
      heading: 'Printed in two inks, projected in one',
      paragraphs: [
        'The identity follows from the same economy. Margem means bank, or margin, so the type goes to the edge and the picture is what is left. Each of the five section posters has a shape of projected light cut into it, a different angle for each, with a night scene from that section’s films printed inside in amber dots. *MARGEM* takes the lower half in Six Caps, which is about as tall and narrow as a Latin alphabet gets and holds up well at 700 × 1000 mm. Headings are in Big Shoulders and text in Archivo. All three are open-licensed, which matters: festival staff set their own late-change notices and signs, and they should not need my licence to do so.',
        'The ident runs before all 168 screenings, so I kept it to ten seconds and took out the sound. Four rooms have four sound systems, and one of them is on an engine. It opens on a slit of light, the same shape as the posters’ apertures, and it closes the same way.'
      ]
    },
    {
      type: 'gallery',
      items: [
        {
          image: image('poster-crossings'),
          alt: 'Amber poster for the Travessias section: a black wedge holding a halftone of a boat on a lit river, with MARGEM in tall black letters.',
          caption: 'Travessias / Crossings.'
        },
        {
          image: image('poster-midnights'),
          alt: 'Black poster for the Meia-Noite section: an amber halftone of a road at night in headlights, with MARGEM in tall amber letters.',
          caption: 'Meia-Noite / Midnights.'
        },
        {
          image: image('poster-openair'),
          alt: 'Amber poster for the Ar Livre section: a black wedge holding a halftone of a low moon over reeds, with MARGEM in tall black letters.',
          caption: 'Ar Livre / Open Air.'
        },
        {
          image: image('poster-archive'),
          alt: 'Black poster for the Arquivo section: an amber halftone of an audience in silhouette before a lit screen, with MARGEM in tall amber letters.',
          caption: 'Arquivo / Archive.'
        }
      ]
    },
    {
      type: 'video',
      src: '/work/margem-programme/ident.mp4',
      poster: image('ident-poster'),
      alt: 'Silent ten-second title sequence. A slit of amber light opens into a beam showing a river at night; the letters of MARGEM arrive one at a time; four night scenes cut inside the letters; the word settles black on amber beside the festival dates, and the frame closes to a line.',
      caption: 'Festival ident, ten seconds, silent, played in all four rooms.'
    },
    {
      type: 'image-pair',
      items: [
        {
          image: image('venue-map'),
          alt: 'Amber map of the town of Alvarim with the black Rio Sorna across it, four rooms marked by large letters joined by a heavy walking route, the ferry crossing dashed, and a table of walking minutes between rooms.',
          caption: 'The map shows rooms and minutes, measured at a queue’s pace by the volunteers.'
        },
        {
          image: image('passes-tickets'),
          alt: 'Press pass, three cream and black tickets, a day pass and a wristband laid flat on amber, each led by a very large room letter or day.',
          caption: 'Passes and tickets. The room letter is the largest thing on every ticket.'
        }
      ]
    },
    {
      type: 'text',
      heading: 'What happened',
      paragraphs: [
        'We repeated the quay test on the second Saturday of the festival with the new book, on people who had not yet opened one. The median fell from 31 seconds to 11, and nobody gave up. The box office keeps a tally of questions on a clipboard, and questions about where and when fell by 61 percent on the 2024 figure. Three screenings moved after the book went to press, and each was posted on the room’s door in the programme’s own type at the programme’s own size.',
        'The print run sold through by the first Tuesday, which had not happened before, and the festival ordered 1,200 more from the same files. Lobo has asked for the same book next year with a new colour. I have told her the amber stays until someone finds a better one on the quay.'
      ]
    },
    {
      type: 'metrics',
      heading: 'The twelfth edition, in figures',
      items: [
        { value: '11 s', label: 'median time for a stranger to find a screening, down from 31' },
        { value: '61%', label: 'fewer where-and-when questions logged at the box office' },
        { value: '41 h', label: 'between the last timetable change and the plates' },
        { value: '8,700', label: 'copies printed in total, 1,200 of them a mid-festival reprint' }
      ]
    }
  ],
  credits: [
    { role: 'Festival director', name: 'Beatriz Lobo' },
    { role: 'Art direction and design', name: 'Noor Castellan' },
    { role: 'Programmer, keeper of the spreadsheet', name: 'Vasco Teixeira' },
    { role: 'Production design', name: 'Duarte Almada' },
    { role: 'Translation', name: 'Helena Rocha-Brandt' },
    { role: 'Signwriting', name: 'Mestre Aurélio Nunes' },
    { role: 'Printing', name: 'Gráfica Ribeirinha, Alvarim' }
  ]
};

export default project;
