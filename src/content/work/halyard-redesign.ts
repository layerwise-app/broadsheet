import { imagesFrom } from '~/content/images';
import type { CaseStudy } from '~/content/types';
import manifest from './halyard-redesign.images.json';

const image = imagesFrom(manifest);

const study: CaseStudy = {
  slug: 'halyard-redesign',
  title: 'Halyard',
  kind: 'Magazine redesign',
  headline: 'A 61-Year-Old Monthly Sheds Five Typefaces and Finds New Readers',
  deck: 'How a Lisbon magazine of ideas and the sea changed everything a reader can see while keeping its press, its paper and its subeditors, in four weeks and without missing an issue.',
  client: 'Halyard Publishing',
  year: 2025,
  role: 'Art director',
  disciplines: ['Art direction', 'Editorial design', 'Type direction'],
  outcome:
    'Newsstand sales rose 18 percent in the first year while the print bill fell 6 percent.',
  excerpt:
    'Halyard has come out every month since 1964, and by 2023 its subscribers were renewing out of loyalty alone. The new editor wanted a magazine that old readers would recognise and younger ones would pick up. The press, the paper and the eleven subeditors all had to stay, and there was no money for photographs. So the covers are now cut from paper with scissors.',
  order: 1,
  cover: {
    image: image('cover'),
    alt: 'Three issues of Halyard side by side on a black field: an orange July cover with a ferry, a cream May cover with a knotted red rope, and a blue December cover with an anchor.',
    caption: 'Three issues from the first year, each in black and one spot ink.'
  },
  plate: {
    image: image('plate'),
    alt: 'The May 2025 cover of Halyard: a large black masthead on cream paper, a vermilion rope tied in a figure-eight knot, and the title Rope: A History of Holding On.',
    caption: 'No. 737, May 2025. The rope took eleven attempts.'
  },
  blocks: [
    {
      type: 'text',
      dropCap: true,
      paragraphs: [
        '*Halyard* has come out every month since March 1964, through a revolution, two owners and a fire at the printer. When Beatriz Noronha took over as editor in 2023 she sent me a single page. It said that nobody under fifty was reading the magazine, that its subscribers renewed out of loyalty, and that the design was doing nothing for either group. She wanted a magazine her oldest readers would recognise by the second page and a stranger might pick up from a kiosk.',
        'The issue I was handed had seven typefaces, a wood-type masthead stretched to fit the page,[1] and nine sell lines competing for the attention of people who had already paid. It had the contents of a good literary monthly and the manners of an airport magazine. Inside, the essays ran at 8.6 on 10 points, on a grid that had been adjusted over the years by whoever happened to be on shift.'
      ],
      notes: [
        'The 1971 masthead was redrawn twice. The second redraw is undated, and nobody at the magazine will admit to it.'
      ]
    },
    {
      type: 'full-image',
      image: image('masthead'),
      alt: 'A two-panel sheet. On the left, the old Halyard: a blue slab-serif masthead and a crowded cover with a muddy halftone sea, a starburst and yellow boxes. On the right, the new masthead in a heavy high-contrast serif and the plain May cover.',
      caption:
        'Before and after. The old cover carried five sell lines that month; the new one carries two.'
    },
    {
      type: 'text',
      heading: 'What could not change',
      columns: 2,
      paragraphs: [
        'Four things were fixed. The magazine prints on the same web-offset press at Gráfica do Barreiro, on the same 70 gsm uncoated paper, under a contract that runs to 2029. A heavier stock would have added €0.31 a copy, which is most of the margin. There was no money for photography: the picture-library line, about €9,400 a year, was the first thing the publisher cut when he heard the word redesign. The eleven subeditors would keep their jobs and their InDesign, with no training budget and no fewer pages to get through.',
        'And the changeover had four weeks. The December issue closed on 29 November and the January plates were due on 27 December. A monthly cannot skip a month, so readers would get the old magazine in one and the new magazine in the next.',
        'The paper decided the most. Seventy-gram uncoated stock drinks ink. Halftone shadows close up, hairlines break,[1] and in a good light you can read page 14 through page 13. I spent the first fortnight of the project with a loupe and a stack of back issues, measuring what had survived the press, and wrote the results on one sheet of A4. Everything afterwards had to pass that sheet.'
      ],
      notes: [
        'Dot gain on this press is 24 percent at the midtone. On a coated sheet it would be closer to 14.'
      ]
    },
    {
      type: 'quote',
      text: 'I asked for a magazine my mother would still recognise. Noor asked how many inks I could afford, and the rest of the meeting was about that.',
      attribution: 'Beatriz Noronha, editor of Halyard'
    },
    {
      type: 'text',
      heading: 'Two typefaces, fourteen styles',
      paragraphs: [
        'Seven typefaces became two. Abril Fatface does the shouting, at sizes where its hairlines are thick enough to print. Its heavy stems are almost immune to dot gain, and at spine width it still reads as a word.[1] Spectral sets everything from the standfirst down. It was drawn for screens, which sounds like the wrong qualification, but its open counters hold on soft paper better than the Garamond the magazine had used since 1988. I raised the text weight by 18 units to allow for the ink that spreads and the ink that shows through from behind.',
        'Text went from 8.6 on 10 points to 9.8 on 14, which costs about 11 percent of the words on a page. Most of them came back when I moved to three columns on a 12-column grid and dropped the boxed pull-outs, each of which repeated a sentence the reader was about to meet anyway.',
        'The 63 paragraph styles in the old template became 14. The styles that stayed kept their names and their keyboard shortcuts, because the subeditors had those in their fingers and there was no week in which they could unlearn them. H1 was still H1 on the morning of the changeover. It simply looked different. We ran one afternoon of practice on copy from the November issue, and I have not had to change a style since.'
      ],
      notes: [
        'I redrew the joins on the y and the r at display size. They are small changes, and they are the only custom drawing in the system.'
      ]
    },
    {
      type: 'full-image',
      image: image('system'),
      alt: 'A feature page with its 12-column grid and baseline overlaid in red, beside a table of paragraph styles, the number 63 struck out next to 14, and twelve swatches of the year’s spot inks.',
      caption:
        'The page, the styles and the year’s second inks. The grid is 12 columns on a 14-point baseline.'
    },
    {
      type: 'image-pair',
      items: [
        {
          image: image('contents'),
          alt: 'The contents spread of issue 739: a giant orange 739, six feature titles with page numbers, departments, the ferry illustration, and an editor’s note.',
          caption: 'Contents, No. 739. The issue number replaced the date as the largest thing on the page.'
        },
        {
          image: image('parallel'),
          alt: 'A spread with an essay on salt in parallel English and Portuguese columns over a cut-paper band of salt pans, facing a full month of tide tables.',
          caption: 'Parallel text and tide tables, No. 738. Spring tides print on the second ink.'
        }
      ]
    },
    {
      type: 'text',
      heading: 'One shape a month',
      columns: 2,
      paragraphs: [
        'With no pictures to buy, the covers had to be made from what we had, which was scissors. Each month I cut one shape from coloured paper, related to the lead essay. It is scanned and separated into two inks, black and a spot chosen for that issue. A rope for the history of knots in May, a ferry in July, a pair of gale flags in November. Flat colour is the one thing this press does without complaint. There are no shadows to fill in and nothing to run at 60 lines per inch.',
        'The masthead fills the full width of every cover in the same position, and the title of the essay sits below in the same face. There are two sell lines, always bottom right, always one size. A cover takes me about a day. Readers used to spot the magazine by its yellow, and now they spot it by the size of the word. Newsagents in Lisbon, who are the hardest critics we have, say they no longer need to look for it.'
      ]
    },
    {
      type: 'gallery',
      items: [
        {
          image: image('cover-march'),
          alt: 'March cover: a dark cod cut from paper on pale sea green, titled Cod: A Reckoning.',
          caption: 'March. Cod: A Reckoning.'
        },
        {
          image: image('cover-august'),
          alt: 'August cover: an orange and black lifebuoy half sunk in scalloped waves on pale teal, titled Against Swimming.',
          caption: 'August. Against Swimming.'
        },
        {
          image: image('cover-october'),
          alt: 'October cover: a pale village and church under rows of wave lines on deep green, titled A Census of Drowned Villages.',
          caption: 'October. A Census of Drowned Villages.'
        },
        {
          image: image('cover-november'),
          alt: 'November cover: two red storm flags with black centres on a mast, titled Storm Names, and Who Chooses Them.',
          caption: 'November. Storm Names, and Who Chooses Them.'
        }
      ]
    },
    {
      type: 'full-image',
      bleed: true,
      image: image('year'),
      alt: 'All twelve covers of 2025 in two rows on black, from a January lighthouse to a December anchor, each with the same masthead and a different spot ink.',
      caption: 'The year, January to December 2025. Twelve cuts, twelve spot inks, one word.'
    },
    {
      type: 'quote',
      text: 'I came in on the Monday braced for a new way of working. It was the same keys. I made my first page before my coffee went cold.',
      attribution: 'Amélia Barros, chief subeditor'
    },
    {
      type: 'text',
      heading: 'Spending the second ink',
      paragraphs: [
        'A second colour across all 96 pages would have cost more than the old covers did. So the spot ink is loaded on one form per 16-page section, which puts it on alternate spreads through the magazine. The flatplan has become an editorial tool: a feature is laid out knowing where the colour falls, with a drop cap and a headline in the spot ink where the form allows it and plain black where it does not. After two issues the editors stopped mentioning it, and no reader has noticed the pattern.',
        'Portuguese was the last problem. *Halyard* has always printed both languages, and it used to bury the translation at the back in 7 points, which told half its readers what the magazine thought of them.[1] Shorter pieces now run in parallel columns, with the original in roman and the translation in italic, whichever language came first. Longer features run the translation straight after the original at full size. The tide tables, which readers would defend with their lives, kept every column.'
      ],
      notes: [
        'Portuguese readers were 58 percent of subscribers at the time. The 7-point setting dated from 1979.'
      ]
    },
    {
      type: 'full-image',
      image: image('flatplan'),
      alt: 'The flatplan for issue 739: six rows of sixteen numbered pages, with the pages on the spot-ink form in orange, advertising in dark navy, and black-only pages left plain.',
      caption: 'Flatplan, No. 739. Orange marks the form that carries the second ink.'
    },
    {
      type: 'full-image',
      bleed: true,
      image: image('feature'),
      alt: 'The opening spread of The Last Ferry to Cacilhas: a full-page cut-paper ferry in orange, navy and cream on the left, and on the right a heavy three-line headline above two columns of text with an orange drop cap.',
      caption: 'Opening spread, No. 739. The illustration prints on one form with the headline’s drop cap.'
    },
    {
      type: 'text',
      heading: 'The result',
      paragraphs: [
        'The first new issue, No. 733, went on sale in the third week of December 2024, on the same day of the month as every issue before it. Across the twelve issues that followed, newsstand sales rose 18 percent and renewals climbed from 71 to 83 percent. The print bill fell 6 percent, because the second ink runs on a fraction of the forms and the covers no longer need four plates. Readers under forty went from 9 to 16 percent of subscribers.',
        'The subeditors missed one deadline in the first month, by ninety minutes, and have not missed one since. Thirty-one readers wrote in to object to the masthead, and the editor printed all of them. One, in Olhão, said the magazine had been going downhill since 1971. He has renewed.'
      ]
    },
    {
      type: 'metrics',
      heading: 'The first twelve issues',
      items: [
        { value: '+18%', label: 'Newsstand sales, year on year' },
        { value: '83%', label: 'Subscriber renewals, up from 71' },
        { value: '−6%', label: 'Print bill, on the same press and paper' },
        { value: '0', label: 'Issues missed during the changeover' }
      ]
    }
  ],
  credits: [
    { role: 'Art direction and cover cuts', name: 'Noor Castellan' },
    { role: 'Editor', name: 'Beatriz Noronha' },
    { role: 'Chief subeditor', name: 'Amélia Barros' },
    { role: 'Production', name: 'Filipa Teles' },
    { role: 'Design assistant', name: 'Joana Reis' },
    { role: 'Scans and separations', name: 'Rui Mateus' },
    { role: 'Printing', name: 'Gráfica do Barreiro' }
  ]
};

export default study;
