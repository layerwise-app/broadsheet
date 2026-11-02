import { existsSync, readdirSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { disciplinesOf, findProject, foliosOf, projects } from '~/content';
import type { Figure, Picture } from '~/content/types';
import { ownerEmail } from '~/portfolio.config';

const pub = (path: string) => join(process.cwd(), 'public', path);

function figuresOf(project: (typeof projects)[number]): Figure[] {
  const figures: Figure[] = [project.cover];
  if (project.plate) figures.push(project.plate);
  for (const block of project.blocks) {
    if (block.type === 'full-image') figures.push(block);
    if (block.type === 'image-pair' || block.type === 'gallery') {
      figures.push(...block.items);
    }
  }
  return figures;
}

const filesOf = (picture: Picture) =>
  picture.base
    ? picture.widths.map((width) => `${picture.base}-${width}.webp`)
    : [picture.src as string];

describe('the case studies', () => {
  it('has the six sample projects, in order', () => {
    expect(projects.length).toBeGreaterThanOrEqual(6);
    const orders = projects.map((project) => project.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  const files = readdirSync(join(process.cwd(), 'src/content/work'))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => basename(file, '.ts'));

  it('has a slug matching each file name', () => {
    expect(projects.map((project) => project.slug).sort()).toEqual(files.sort());
  });

  describe.each(projects.map((project) => [project.slug, project] as const))(
    '%s',
    (_slug, project) => {
      it('has at least five distinct images, all on disk', () => {
        const figures = figuresOf(project);
        const distinct = new Set(figures.map((figure) => filesOf(figure.image)[0]));
        expect(distinct.size).toBeGreaterThanOrEqual(5);
        for (const figure of figures) {
          expect(figure.alt.trim().length).toBeGreaterThan(10);
          for (const file of filesOf(figure.image)) {
            expect(existsSync(pub(file)), file).toBe(true);
          }
        }
      });

      it('shares its cover as a JPG under 1 MB', () => {
        const share = project.cover.image.share as string;
        expect(share).toMatch(/\.jpg$/);
        expect(statSync(pub(share)).size).toBeLessThan(1024 * 1024);
      });

      it('keeps galleries to four images and has its videos on disk', () => {
        for (const block of project.blocks) {
          if (block.type === 'gallery') {
            expect(block.items.length).toBeLessThanOrEqual(4);
          }
          if (block.type === 'video') {
            expect(existsSync(pub(block.src)), block.src).toBe(true);
          }
        }
      });

      it('has a margin note for every reference', () => {
        for (const block of project.blocks) {
          if (block.type !== 'text') continue;
          const refs = block.paragraphs
            .join(' ')
            .match(/\[\d+\]/g)
            ?.map((ref) => Number(ref.slice(1, -1)));
          for (const ref of refs ?? []) {
            expect(ref).toBeLessThanOrEqual(block.notes?.length ?? 0);
          }
        }
      });
    }
  );
});

describe('the issue', () => {
  it('numbers features one after another, closing on even pages', () => {
    const { starts, colophon, letters } = foliosOf(projects);
    const list = [...starts.values()];
    expect(list[0]).toBe(4);
    expect(list).toEqual([...list].sort((a, b) => a - b));
    expect(colophon % 2).toBe(0);
    expect(letters).toBe(colophon + 2);
  });

  it('finds the next project, wrapping to the first', () => {
    const last = projects.at(-1);
    expect(findProject(last?.slug ?? '')?.next?.slug).toBe(projects[0].slug);
    expect(findProject('nope')).toBeNull();
  });

  it('counts disciplines', () => {
    expect(disciplinesOf([{ disciplines: ['a', 'b'] }, { disciplines: ['a'] }])).toEqual([
      { name: 'a', count: 2 },
      { name: 'b', count: 1 }
    ]);
  });

  it('ships with no owner email', () => {
    expect(ownerEmail).toBe('');
  });
});
