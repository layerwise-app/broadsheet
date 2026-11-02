import { createFileRoute } from '@tanstack/react-router';
import { ContactForm } from '~/components/ContactForm';
import { PageFolio } from '~/components/Folio';
import { getIssue } from '~/content/queries';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/contact')({
  loader: async () => {
    const { letters } = await getIssue();
    return { folio: letters };
  },
  head: () =>
    seo({
      title: `Letters to the editor, contact ${portfolio.name}`,
      description: `Write to ${portfolio.name} about a redesign, a book series, a catalogue, or anything else that gets printed.`,
      path: '/contact'
    }),
  component: LettersPage
});

function LettersPage() {
  const { folio } = Route.useLoaderData();
  return (
    <main id='main' className='page letters'>
      <header className='letters-head'>
        <h1 className='page-title'>Letters to the editor</h1>
      </header>
      <section className='letters-form' aria-label='Write a letter'>
        <p className='letters-intro'>
          Commissions, corrections, and complaints are all welcome. It helps to know
          what is being printed, on what, and by when. Every letter is read, and none
          are published.
        </p>
        <ContactForm />
      </section>
      <aside className='letters-side' aria-label='Other ways to reach the editor'>
        {portfolio.availability ? (
          <section>
            <h2 className='rail-heading'>Availability</h2>
            <p>{portfolio.availability}</p>
          </section>
        ) : null}
        <section>
          <h2 className='rail-heading'>Elsewhere</h2>
          <ul className='socials'>
            {portfolio.socials.map((social) => (
              <li key={social.href}>
                <a href={social.href} rel='me noopener'>
                  {social.label}
                </a>
                <span>{social.handle}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className='rail-heading'>The office</h2>
          <p>
            {portfolio.location}, {portfolio.country}. Replies usually go out within a
            week.
          </p>
        </section>
      </aside>
      <PageFolio number={folio} label='letters' />
    </main>
  );
}
