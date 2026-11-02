import { createFileRoute, Link } from '@tanstack/react-router';
import { PageFolio } from '~/components/Folio';
import { Img } from '~/components/Img';
import { Inline } from '~/components/Inline';

import { getIssue } from '~/content/queries';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/work/')({
  validateSearch: (search: Record<string, unknown>): { discipline?: string } =>
    typeof search.discipline === 'string' && search.discipline
      ? { discipline: search.discipline }
      : {},
  loader: () => getIssue(),
  head: () =>
    seo({
      title: `Contents, the work of ${portfolio.name}`,
      description: `Every project in this issue with its page number: magazines, book jackets, catalogues, a newspaper supplement, a food quarterly, and a film festival programme.`,
      path: '/work'
    }),
  component: ContentsPage
});

function ContentsPage() {
  const { stories, disciplines, colophon, letters } = Route.useLoaderData();
  const { discipline } = Route.useSearch();
  const shown = discipline
    ? stories.filter((story) => story.disciplines.includes(discipline))
    : stories;

  return (
    <main id='main' className='page contents-page'>
      <header className='contents-head'>
        <h1 className='page-title'>Contents</h1>
        <p className='contents-intro'>
          {stories.length} features in this issue, with their folios. Read in order, or
          turn straight to the department you came for.
        </p>
      </header>

      <nav className='departments' aria-label='Filter by discipline'>
        <span className='departments-label'>Departments</span>
        <ul>
          <li>
            <Link
              to='/work'
              search={{ discipline: undefined }}
              activeOptions={{ includeSearch: true, explicitUndefined: true }}
              resetScroll={false}
            >
              All <span className='count'>{stories.length}</span>
            </Link>
          </li>
          {disciplines.map(({ name, count }) => (
            <li key={name}>
              <Link
                to='/work'
                search={{ discipline: name }}
                activeOptions={{ includeSearch: true }}
                resetScroll={false}
              >
                {name} <span className='count'>{count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className='sr-only' role='status'>
        {discipline
          ? `Showing ${shown.length} projects in ${discipline}.`
          : `Showing all ${shown.length} projects.`}
      </p>

      {shown.length > 0 ? (
        <ol className='entries'>
          {shown.map((story, index) => {
            return (
              <li key={story.slug} className='entry'>
                <p className='entry-folio'>
                  <span className='sr-only'>Page </span>
                  {story.folio}
                </p>
                <div className='entry-body'>
                  <h2 className='entry-title'>
                    <Link
                      to='/work/$slug'
                      params={{ slug: story.slug }}
                      className='story-link'
                    >
                      {story.title}
                    </Link>
                  </h2>
                  <p className='entry-headline'>
                    <Inline text={story.headline} />
                  </p>
                  <p className='entry-deck'>
                    <Inline text={story.deck} />
                  </p>
                  <p className='entry-meta'>
                    {story.kind}. {story.client}, {story.year}. {story.disciplines.join(', ')}.
                  </p>
                </div>
                <Img
                  picture={story.cover.image}
                  alt={story.cover.alt}
                  sizes='(min-width: 700px) 24vw, calc(100vw - 2 * var(--margin) - 4em)'
                  priority={index === 0}
                  className='entry-image'
                />
              </li>
            );
          })}
        </ol>
      ) : (
        <p className='entries-empty'>
          Nothing is filed under that department in this issue.{' '}
          <Link to='/work' search={{}}>
            See all the work
          </Link>
          .
        </p>
      )}

      <ol className='entries entries--back'>
        <li className='entry entry--small'>
          <p className='entry-folio'>
            <span className='sr-only'>Page </span>
            {colophon}
          </p>
          <p className='entry-title'>
            <Link to='/about'>Colophon</Link>
          </p>
        </li>
        <li className='entry entry--small'>
          <p className='entry-folio'>
            <span className='sr-only'>Page </span>
            {letters}
          </p>
          <p className='entry-title'>
            <Link to='/contact'>Letters to the editor</Link>
          </p>
        </li>
      </ol>

      <PageFolio number={2} label='contents' />
    </main>
  );
}
