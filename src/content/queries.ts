import { createServerFn } from '@tanstack/react-start';
import { disciplinesOf, findProject, folios, projects, summaryOf } from './index';

// Content is read on the server, so the articles never add to the browser's
// JavaScript. Each page receives only what it prints.

/** The front page's "Overheard": the lead story's first pull quote. */
function overheard() {
  for (const block of projects[0]?.blocks ?? []) {
    if (block.type === 'quote') return block;
  }
  return null;
}

export const getIssue = createServerFn({ method: 'GET' }).handler(() => ({
  stories: projects.map(summaryOf),
  overheard: overheard(),
  disciplines: disciplinesOf(projects),
  colophon: folios.colophon,
  letters: folios.letters
}));

export const getFeature = createServerFn({ method: 'GET' })
  .validator((input: { slug: string }) => input)
  .handler(({ data }) => findProject(data.slug));
