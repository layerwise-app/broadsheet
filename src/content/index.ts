import type { CaseStudy } from './types';

// Every `src/content/work/<slug>.ts` is picked up automatically.
const modules = import.meta.glob<{ default: CaseStudy }>('./work/*.ts', {
  eager: true
});

export const projects: CaseStudy[] = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => a.order - b.order || b.year - a.year);

/** A feature's two opening pages, then one page for each block. */
const lengthOf = (project: CaseStudy) => 2 + project.blocks.length;



const FIRST_FEATURE_FOLIO = 4;

/** Where each feature starts in the issue's page count. */
export function foliosOf(list: CaseStudy[]) {
  const starts = new Map<string, number>();
  let next = FIRST_FEATURE_FOLIO;
  for (const project of list) {
    starts.set(project.slug, next);
    next += lengthOf(project);
  }
  // Colophon then Letters close the issue, each on a fresh even page.
  const colophon = next + (next % 2);
  return { starts, colophon, letters: colophon + 2 };
}

export const folios = foliosOf(projects);

export function summaryOf(project: CaseStudy) {
  const { blocks: _blocks, credits: _credits, ...summary } = project;
  return { ...summary, folio: folios.starts.get(project.slug) ?? 0 };
}

export type ProjectSummary = ReturnType<typeof summaryOf>;

export function findProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return null;
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return {
    project,
    folio: folios.starts.get(project.slug) ?? 0,
    next: next.slug === project.slug ? null : summaryOf(next)
  };
}

/** Disciplines in the order they first appear, with a count of projects. */
export function disciplinesOf(list: { disciplines: string[] }[]) {
  const counts = new Map<string, number>();
  for (const project of list) {
    for (const discipline of project.disciplines) {
      counts.set(discipline, (counts.get(discipline) ?? 0) + 1);
    }
  }
  return [...counts].map(([name, count]) => ({ name, count }));
}
