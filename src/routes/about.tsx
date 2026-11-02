import { createFileRoute } from '@tanstack/react-router';
import { PageFolio } from '~/components/Folio';
import { Inline } from '~/components/Inline';
import { about } from '~/content/about';
import { getIssue } from '~/content/queries';
import { personJsonLd } from '~/lib/site';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/about')({
  loader: async () => {
    const { colophon } = await getIssue();
    return { folio: colophon };
  },
  head: () =>
    seo({
      title: `Colophon, about ${portfolio.name}`,
      description: `${portfolio.name}: bio, services, selected clients, experience, and a CV to download.`,
      path: '/about',
      jsonLd: personJsonLd()
    }),
  component: ColophonPage
});

function ColophonPage() {
  const { folio } = Route.useLoaderData();
  return (
    <main id='main' className='page colophon'>
      <header className='colophon-head'>
        <h1 className='page-title'>Colophon</h1>
        <p className='colophon-who'>
          {portfolio.name}. {portfolio.role}, {portfolio.location}.
        </p>
      </header>

      <section className='colophon-bio prose prose--dropcap prose--columns' aria-label='Biography'>
        {portfolio.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>
            <Inline text={paragraph} />
          </p>
        ))}
      </section>

      <section className='colophon-services'>
        <h2 className='rail-heading'>Services</h2>
        <dl className='services'>
          {about.services.map((service) => (
            <div key={service.name}>
              <dt>{service.name}</dt>
              <dd>{service.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className='colophon-clients'>
        <h2 className='rail-heading'>Selected clients</h2>
        <ul className='clients'>
          {about.clients.map((client) => (
            <li key={client}>{client}</li>
          ))}
        </ul>
      </section>

      <section className='colophon-experience'>
        <h2 className='rail-heading'>Experience</h2>
        <dl className='experience'>
          {about.experience.map((entry) => (
            <div key={`${entry.years}-${entry.place}`}>
              <dt>{entry.years}</dt>
              <dd>
                <strong>{entry.role}</strong>
                <span>{entry.place}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className='cv'>
          <a href={about.cv.href} download>
            {about.cv.label}
          </a>{' '}
          <span className='cv-detail'>{about.cv.detail}</span>
        </p>
      </section>

      <section className='colophon-type'>
        <h2 className='rail-heading'>About this edition</h2>
        <p>
          Text is set in {portfolio.fonts.text.family}, by Production Type.
          Headlines are set in the condensed cut of {portfolio.fonts.display.family},
          by the Noto project. Both are open-licensed and served from this site.
        </p>
      </section>

      <PageFolio number={folio} label='colophon' />
    </main>
  );
}
