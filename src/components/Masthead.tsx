import { Link } from '@tanstack/react-router';
import type { Edition } from '~/lib/edition';
import { portfolio } from '~/portfolio.config';

const sections = [
  { to: '/work', label: 'Contents', gloss: 'the work' },
  { to: '/about', label: 'Colophon', gloss: 'about' },
  { to: '/contact', label: 'Letters', gloss: 'write in' }
] as const;

function SectionNav() {
  return (
    <nav className='sections' aria-label='Main'>
      {sections.map((section) => (
        <Link
          key={section.to}
          to={section.to}
          activeProps={{ 'aria-current': 'page' }}
        >
          {section.label} <span className='gloss'>{section.gloss}</span>
        </Link>
      ))}
    </nav>
  );
}

/** The Home page's front-page nameplate. */
export function Masthead({ edition }: { edition: Edition }) {
  return (
    <header className='masthead'>
      <p className='ear ear--left'>
        <span className='ear-kicker'>Vol. {edition.volume}</span>
        <span>No. {edition.issue}</span>
      </p>
      <h1 className='nameplate'>{portfolio.name}</h1>
      <p className='ear ear--right'>
        <span className='ear-kicker'>{portfolio.location}</span>
        <span>{portfolio.role}</span>
      </p>
      <div className='dateline'>
        <p className='dateline-date'>{edition.date}</p>
        <SectionNav />
      </div>
    </header>
  );
}

/** The small running head on every other page. */
export function RunningHead({ edition }: { edition: Edition }) {
  return (
    <header className='running-head'>
      <Link to='/' className='running-name'>
        {portfolio.name}
      </Link>
      <p className='running-issue'>
        No. {edition.issue}, {edition.date}
      </p>
      <SectionNav />
    </header>
  );
}
