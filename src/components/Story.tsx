import { Link } from '@tanstack/react-router';
import { Img } from '~/components/Img';
import { Inline } from '~/components/Inline';
import type { ProjectSummary } from '~/content';

/** One story on the front page; the whole story is one link, one tab stop. */
export function Story({
  story,
  className,
  layout,
  sizes
}: {
  story: ProjectSummary;
  className: string;
  layout: 'side' | 'top' | 'tail' | 'wide';
  sizes: string;
}) {
  const usesPlate = layout === 'side' || layout === 'tail';
  const figure = usesPlate && story.plate ? story.plate : story.cover;
  return (
    <article className={`story story--${layout} ${className}`}>
      <p className='kicker'>{story.kind}</p>
      <h2 className='story-headline'>
        <Link to='/work/$slug' params={{ slug: story.slug }} className='story-link'>
          {story.headline}
        </Link>
      </h2>
      {usesPlate ? (
        <p className='story-deck'>
          <Inline text={story.deck} />
        </p>
      ) : null}
      <Img picture={figure.image} alt={figure.alt} sizes={sizes} className='story-image' />
      <p className='story-text'>
        <Inline text={story.excerpt} />
      </p>
      <p className='jump'>
        {story.client}, {story.year}. Continued on page {story.folio}
      </p>
    </article>
  );
}
