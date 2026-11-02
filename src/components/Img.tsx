import { srcOf, srcSetOf } from '~/content/images';
import type { Picture } from '~/content/types';

type ImgProps = {
  picture: Picture;
  alt: string;
  /** The rendered width, for the browser's choice from the srcset. */
  sizes: string;
  /** Set on the page's largest image above the fold. */
  priority?: boolean;
  className?: string;
};

/**
 * An image that holds its space before it loads: the box takes its shape from
 * the stored dimensions and shows the blur placeholder until the file arrives.
 */
export function Img({ picture, alt, sizes, priority, className }: ImgProps) {
  return (
    <span
      className={className ? `plate ${className}` : 'plate'}
      style={{
        aspectRatio: `${picture.width} / ${picture.height}`,
        backgroundImage: `url("${picture.blur}")`
      }}
    >
      <img
        src={srcOf(picture)}
        srcSet={srcSetOf(picture)}
        sizes={picture.base ? sizes : undefined}
        alt={alt}
        width={picture.width}
        height={picture.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding='async'
      />
    </span>
  );
}
