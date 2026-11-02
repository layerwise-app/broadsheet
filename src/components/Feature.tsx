import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { FolioTracker } from '~/components/Folio';
import { Img } from '~/components/Img';
import { Inline } from '~/components/Inline';
import type { ProjectSummary } from '~/content';
import type { Block, CaseStudy, Figure, TextBlock } from '~/content/types';

const PAGE = 'min(100vw - 2 * var(--margin), var(--page-max))';
const SIZES = {
  page: `(min-width: 1000px) ${PAGE}, calc(100vw - 2 * var(--margin))`,
  bleed: '100vw',
  narrow:
    '(min-width: 1000px) min(50vw, 780px), calc(100vw - 2 * var(--margin))'
};

function FigureCaption({ number, caption }: { number: number; caption?: string }) {
  return (
    <figcaption className='caption'>
      <span className='caption-number'>Fig. {number}</span>
      {caption ? (
        <>
          {' '}
          <Inline text={caption} />
        </>
      ) : null}
    </figcaption>
  );
}

function Row({
  items,
  firstFigure,
  folio
}: {
  items: Figure[];
  firstFigure: number;
  folio: number;
}) {
  // Sharing width by aspect ratio gives every picture in the row one height.
  const share = 100 / items.reduce(
    (sum, item) => sum + item.image.width / item.image.height,
    0
  );
  return (
    <section className='block block--row' data-folio={folio}>
      {items.map((item, index) => {
        const ratio = item.image.width / item.image.height;
        return (
          <figure
            key={item.image.base ?? item.image.src}
            className='row-item'
            style={{ flexGrow: ratio, flexBasis: 0 }}
          >
            <Img
              picture={item.image}
              alt={item.alt}
              sizes={`(min-width: 1000px) ${Math.round(share * ratio)}vw, calc(100vw - 2 * var(--margin))`}
            />
            <FigureCaption number={firstFigure + index} caption={item.caption} />
          </figure>
        );
      })}
    </section>
  );
}

function Text({
  block,
  noteStart,
  folio
}: {
  block: TextBlock;
  noteStart: number;
  folio: number;
}) {
  const columns = block.columns === 2;
  return (
    <section className={`block block--text${columns ? ' block--columns' : ''}`} data-folio={folio}>
      {block.heading ? <h2 className='crosshead'>{block.heading}</h2> : null}
      <div className={`prose${block.dropCap ? ' prose--dropcap' : ''}`}>
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>
            <Inline
              text={paragraph}
              noteRef={(number) => {
                const global = noteStart + number;
                return (
                  <sup className='note-ref'>
                    <a href={`#note-${global}`} aria-label={`Margin note ${global}`}>
                      {global}
                    </a>
                  </sup>
                );
              }}
            />
          </p>
        ))}
      </div>
      {block.notes?.length ? (
        <ol className='notes' start={noteStart + 1} aria-label='Margin notes'>
          {block.notes.map((note, index) => (
            <li key={note.slice(0, 40)} id={`note-${noteStart + index + 1}`}>
              <span className='note-number'>{noteStart + index + 1}</span>{' '}
              <Inline text={note} />
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}

function BlockView({
  block,
  folio,
  figure,
  noteStart,
  quoteIndex
}: {
  block: Block;
  folio: number;
  figure: number;
  noteStart: number;
  quoteIndex: number;
}) {
  switch (block.type) {
    case 'text':
      return <Text block={block} noteStart={noteStart} folio={folio} />;
    case 'full-image': {
      const portrait = block.image.height > block.image.width;
      return (
        <figure
          className={`block block--image${block.bleed ? ' block--bleed' : ''}${portrait ? ' block--portrait' : ''}`}
          data-folio={folio}
        >
          <Img
            picture={block.image}
            alt={block.alt}
            sizes={block.bleed ? SIZES.bleed : portrait ? SIZES.narrow : SIZES.page}
          />
          <FigureCaption number={figure} caption={block.caption} />
        </figure>
      );
    }
    case 'image-pair':
    case 'gallery':
      return <Row items={block.items} firstFigure={figure} folio={folio} />;
    case 'quote':
      return (
        <blockquote
          className={`block block--quote block--quote-${quoteIndex % 2 === 0 ? 'left' : 'right'}`}
          data-folio={folio}
        >
          <p className='quote-text'>
            <Inline text={block.text} />
          </p>
          {block.attribution ? (
            <footer className='quote-source'>{block.attribution}</footer>
          ) : null}
        </blockquote>
      );
    case 'video':
      return (
        <figure className='block block--video' data-folio={folio}>
          <span
            className='plate'
            style={{
              aspectRatio: `${block.poster.width} / ${block.poster.height}`,
              backgroundImage: `url("${block.poster.blur}")`
            }}
          >
            {/* biome-ignore lint/a11y/useMediaCaption: the title sequence is silent */}
            <video
              controls
              playsInline
              preload='none'
              poster={block.poster.base ? `${block.poster.base}-1600.webp` : block.poster.src}
              width={block.poster.width}
              height={block.poster.height}
              aria-label={block.alt}
              src={block.src}
            />
          </span>
          <FigureCaption number={figure} caption={block.caption} />
        </figure>
      );
    case 'metrics':
      return (
        <section className='block block--metrics' data-folio={folio}>
          {block.heading ? <h2 className='metrics-heading'>{block.heading}</h2> : null}
          <dl className='metrics'>
            {block.items.map((item) => (
              <div key={item.label} className='metric'>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
  }
}

const figuresIn = (block: Block) => {
  if (block.type === 'full-image' || block.type === 'video') return 1;
  if (block.type === 'image-pair' || block.type === 'gallery') return block.items.length;
  return 0;
};

export function Feature({
  project,
  folio,
  next
}: {
  project: CaseStudy;
  folio: number;
  next: ProjectSummary | null;
}) {
  // The cover is Fig. 1; figures, notes, and pages then count through the piece.
  let figure = 2;
  let notes = 0;
  let quotes = 0;
  let page = folio + 2;
  const views: ReactNode[] = [];
  for (const block of project.blocks) {
    views.push(
      <BlockView
        key={page}
        block={block}
        folio={page}
        figure={figure}
        noteStart={notes}
        quoteIndex={quotes}
      />
    );
    page += 1;
    figure += figuresIn(block);
    if (block.type === 'text') notes += block.notes?.length ?? 0;
    if (block.type === 'quote') quotes += 1;
  }
  const lastFolio = folio + 1 + project.blocks.length;

  return (
    <>
      <main id='main' className='feature'>
        <header className='opening' data-folio={folio}>
          <p className='kicker opening-kicker'>
            Feature, page {folio}. {project.kind}
          </p>
          <h1 className='opening-headline'>{project.headline}</h1>
          <p className='opening-deck'>
            <Inline text={project.deck} />
          </p>
          <dl className='specs'>
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Disciplines</dt>
              <dd>{project.disciplines.join(', ')}</dd>
            </div>
            <div>
              <dt>Outcome</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>
        </header>

        <figure className='block block--image block--bleed block--cover' data-folio={folio + 1}>
          <Img
            picture={project.cover.image}
            alt={project.cover.alt}
            sizes={SIZES.bleed}
            priority
          />
          <FigureCaption number={1} caption={project.cover.caption} />
        </figure>

        {views}

        <section className='credits' aria-labelledby='credits-heading'>
          <h2 id='credits-heading' className='metrics-heading'>
            Credits
          </h2>
          <dl className='credits-list'>
            {project.credits.map((credit) => (
              <div key={`${credit.role}-${credit.name}`}>
                <dt>{credit.role}</dt>
                <dd>{credit.name}</dd>
              </div>
            ))}
          </dl>
          <p className='ends'>
            Ends, page {lastFolio}
          </p>
        </section>

        {next ? (
          <article className='next'>
            <p className='kicker'>Continued on page {next.folio}</p>
            <h2 className='next-headline'>
              <Link to='/work/$slug' params={{ slug: next.slug }} className='story-link'>
                {next.headline}
              </Link>
            </h2>
            <p className='next-deck'>
              <Inline text={next.deck} />
            </p>
            <Img
              picture={next.cover.image}
              alt={next.cover.alt}
              sizes='(min-width: 1000px) 50vw, calc(100vw - 2 * var(--margin))'
              className='next-image'
            />
          </article>
        ) : null}
      </main>
      <FolioTracker start={folio} label={`${project.title}, ${project.year}`} />
    </>
  );
}
