import { createFileRoute, Link } from '@tanstack/react-router';
import { PageFolio } from '~/components/Folio';
import { Img } from '~/components/Img';
import { Inline } from '~/components/Inline';
import { Story } from '~/components/Story';
import { getIssue } from '~/content/queries';
import { personJsonLd, site, siteUrl } from '~/lib/site';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/')({
  loader: () => getIssue(),
  head: () =>
    seo({
      title: `${portfolio.name}, ${portfolio.role}`,
      description: portfolio.summary,
      path: '/',
      jsonLd: [
        personJsonLd(),
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: site.name,
          url: siteUrl('/')
        }
      ]
    }),
  component: FrontPage
});

function FrontPage() {
  const { stories, disciplines, overheard, colophon, letters } = Route.useLoaderData();
  const [lead, second, third, fourth, fifth, sixth, ...others] = stories;

  return (
    <main id='main' className='page front'>
      <aside className='rail' aria-label='In this issue'>
        <section className='rail-section'>
          <h2 className='rail-heading'>In brief</h2>
          <p>{portfolio.shortBio}</p>
        </section>
        <section className='rail-section'>
          <h2 className='rail-heading'>Inside this issue</h2>
          <ol className='inside'>
            {stories.map((story) => (
              <li key={story.slug}>
                <Link to='/work/$slug' params={{ slug: story.slug }}>
                  {story.title}
                </Link>
                <span className='inside-folio'>{story.folio}</span>
              </li>
            ))}
            <li>
              <Link to='/about'>Colophon</Link>
              <span className='inside-folio'>{colophon}</span>
            </li>
            <li>
              <Link to='/contact'>Letters</Link>
              <span className='inside-folio'>{letters}</span>
            </li>
          </ol>
        </section>
        {overheard ? (
          <section className='rail-section'>
            <h2 className='rail-heading'>Overheard</h2>
            <blockquote className='overheard'>
              <p>
                <Inline text={overheard.text} />
              </p>
              {overheard.attribution ? <footer>{overheard.attribution}</footer> : null}
            </blockquote>
          </section>
        ) : null}
      </aside>

      {lead ? (
        <article className='lead'>
          <p className='kicker'>
            Lead story. {lead.kind}
          </p>
          <h2 className='lead-headline'>
            <Link to='/work/$slug' params={{ slug: lead.slug }} className='story-link'>
              {lead.headline}
            </Link>
          </h2>
          <p className='lead-deck'>
            <Inline text={lead.deck} />
          </p>
          <figure className='lead-figure'>
            <Img
              picture={lead.cover.image}
              alt={lead.cover.alt}
              sizes='(min-width: 1100px) 50vw, calc(100vw - 2 * var(--margin))'
              priority
            />
            {lead.cover.caption ? (
              <figcaption className='caption'>
                <Inline text={lead.cover.caption} />
              </figcaption>
            ) : null}
          </figure>
          <div className='lead-text'>
            <p className='lead-excerpt'>
              <Inline text={lead.excerpt} />
            </p>
            <p className='lead-outcome'>
              <Inline text={lead.outcome} />
            </p>
            <p className='jump'>
              {lead.client}, {lead.year}. Continued on page {lead.folio}
            </p>
          </div>
        </article>
      ) : null}

      {second ? (
        <Story story={second} className='slot-2' layout='side' sizes='(min-width: 1100px) 20vw, 44vw' />
      ) : null}
      {third ? (
        <Story story={third} className='slot-3' layout='top' sizes='(min-width: 1100px) 22vw, calc(100vw - 2 * var(--margin))' />
      ) : null}
      {fourth ? (
        <Story story={fourth} className='slot-4' layout='top' sizes='(min-width: 1100px) 24vw, calc(100vw - 2 * var(--margin))' />
      ) : null}
      {fifth ? (
        <Story story={fifth} className='slot-5' layout='tail' sizes='(min-width: 1100px) 12vw, 44vw' />
      ) : null}
      {sixth ? (
        <Story story={sixth} className='slot-6' layout='wide' sizes='(min-width: 1100px) 40vw, calc(100vw - 2 * var(--margin))' />
      ) : null}

      <aside className='notices' aria-label='Notices'>
        <h2 className='rail-heading'>Notices</h2>
        {portfolio.availability ? (
          <p className='notice-lead'>{portfolio.availability}</p>
        ) : null}
        <p>
          Letters to the editor are read and answered.{' '}
          <Link to='/contact'>Write in</Link>, or see the{' '}
          <Link to='/about'>colophon</Link> for services and past clients.
        </p>
        <h2 className='rail-heading notices-more'>Departments</h2>
        <ul className='inside'>
          {disciplines.map(({ name, count }) => (
            <li key={name}>
              <Link to='/work' search={{ discipline: name }}>
                {name}
              </Link>
              <span className='inside-folio'>{count}</span>
            </li>
          ))}
        </ul>
        {others.length > 0 ? (
          <>
            <h2 className='rail-heading notices-more'>Also in this issue</h2>
            <ul className='also'>
              {others.map((story) => (
                <li key={story.slug}>
                  <Link to='/work/$slug' params={{ slug: story.slug }}>
                    {story.headline}
                  </Link>{' '}
                  <span className='jump'>Page {story.folio}</span>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </aside>

      <div className='front-folio'>
        <PageFolio number={1} label='front page' />
      </div>
    </main>
  );
}
