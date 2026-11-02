// The About page (the Colophon). The bio itself is in `src/portfolio.config.ts`.

export const about = {
  /** What a client can hire the owner for. */
  services: [
    {
      name: 'Redesigns',
      detail: 'Magazines and newspapers, usually on the press and paper they already have.'
    },
    {
      name: 'Art direction',
      detail: 'By the issue or by the year, including covers, commissioning, and the flatplan.'
    },
    {
      name: 'Book design',
      detail: 'Jackets, series systems, and interiors for trade and small presses.'
    },
    {
      name: 'Catalogues',
      detail: 'Exhibition catalogues and collection books, from plate lists to colour proofs.'
    },
    {
      name: 'Type direction',
      detail: 'Choosing, licensing, and adjusting typefaces, with style sheets people will use.'
    },
    {
      name: 'Programmes',
      detail: 'Festival and season programmes that work when folded, in a queue, in the dark.'
    }
  ],
  clients: [
    'Halyard Publishing',
    'Ostra Press',
    'Museu da Ribeira',
    'The Northern Ledger',
    'Mesa Comum',
    'Festival Margem',
    'Revista Travessa',
    'Fundação Serrado',
    'Casa Alvim Edições',
    'The Tidewater Review',
    'Orla Records',
    'Imprensa do Cais'
  ],
  experience: [
    {
      years: '2014–now',
      role: 'Principal',
      place: 'Studio Castellan, Lisbon'
    },
    {
      years: '2019–now',
      role: 'Visiting tutor, editorial design',
      place: 'Escola do Livro, Porto'
    },
    {
      years: '2010–2014',
      role: 'Art director',
      place: 'Revista Travessa, Lisbon'
    },
    {
      years: '2007–2010',
      role: 'Deputy art director, weekend sections',
      place: 'The Northern Ledger, Aldmouth'
    },
    {
      years: '2004–2007',
      role: 'Page designer, nights',
      place: 'Imprensa do Cais, Setúbal'
    }
  ],
  cv: {
    /** A PDF in `public/`. */
    href: '/noor-castellan-cv.pdf',
    label: 'Download the CV',
    detail: 'PDF, one page'
  }
};
