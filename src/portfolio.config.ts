// The owner's profile and the site's look. Edit this file to change the name,
// bio, links, fonts, or colours everywhere at once.

export const portfolio = {
  name: 'Noor Castellan',
  role: 'Art director and editorial designer',
  location: 'Lisbon',
  country: 'Portugal',
  /** The masthead's date is printed in this time zone. */
  timeZone: 'Europe/Lisbon',
  /**
   * The first day of the practice. The masthead counts from it, the way a
   * newspaper does: one volume a year, one issue a day.
   */
  foundedOn: '2014-03-17',
  /** One sentence for search results and link previews. */
  summary:
    'Noor Castellan is an art director and editorial designer in Lisbon, working on magazines, books, catalogues, and newspapers.',
  /** Printed in the Home page's "In brief" column. */
  shortBio:
    'Art director and editorial designer in Lisbon. Twelve years of magazines, book jackets, catalogues, and the occasional crossword, made for people who read them on buses.',
  /** Printed on the About page. `*word*` sets italics. */
  bio: [
    'I design things people read from the front to the back: magazines, newspapers, book series, museum catalogues, and programmes that get folded into a coat pocket. I started as a junior on a daily, where a page that was late did not run, and I have kept the habits. I ask how the press behaves before I ask what the page should look like.',
    'I run a studio of one in Lisbon, on the third floor above a ship chandler in Cais do Sodré, and bring in the people each job needs. Most of my clients have been printing for longer than I have been alive, and most of them come to me with a press, a paper, and a staff they cannot change. I find those limits useful. They settle a lot of arguments before anyone has to have them.',
    'I also teach one term a year at the *Escola do Livro* in Porto, where I make students set a page of tide tables before they are allowed to choose a typeface.'
  ],
  /** Printed on Home and Contact. Leave empty to hide it. */
  availability: 'Now taking commissions for spring 2027.',
  /**
   * Social links, shown beside the contact form and in the footer. These
   * samples use the reserved `.example` domain, so they lead nowhere.
   */
  socials: [
    {
      label: 'Instagram',
      handle: '@noor.castellan',
      href: 'https://instagram.example/noor.castellan'
    },
    {
      label: 'Are.na',
      handle: 'noor-castellan',
      href: 'https://are-na.example/noor-castellan'
    },
    {
      label: 'LinkedIn',
      handle: 'in/noorcastellan',
      href: 'https://linkedin.example/in/noorcastellan'
    }
  ],
  /**
   * Self-hosted, open-licensed fonts. The files are declared in
   * `src/styles/fonts.css`, under these family names.
   */
  fonts: {
    text: {
      family: 'Newsreader',
      fallback: "Georgia, 'Times New Roman', serif"
    },
    display: {
      family: 'Noto Serif Display',
      fallback: "'Times New Roman', Times, serif"
    }
  },
  /** Body text must keep at least 4.5:1 contrast against `paper`. */
  colors: {
    paper: '#f4eee1',
    ink: '#15120e',
    /** Secondary text: captions, datelines, labels. */
    inkSoft: '#4c4438',
    /** The one accent. */
    accent: '#6e1423',
    /** Text on the accent colour. */
    onAccent: '#f4eee1'
  }
};

/**
 * Where contact-form messages are emailed. Empty means they are only saved to
 * the database. It stays on the server: only the contact form's server code
 * reads this export, so the address never reaches the browser.
 */
export const ownerEmail = '';
