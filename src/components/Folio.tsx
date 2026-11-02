import { useEffect, useRef, useState } from 'react';
import { portfolio } from '~/portfolio.config';

/** A page's printed folio: even pages on the left, odd on the right. */
export function PageFolio({ number, label }: { number: number; label: string }) {
  return (
    <p className={`folio folio--${number % 2 === 0 ? 'even' : 'odd'}`}>
      <span className='folio-number'>{number}</span>
      <span className='folio-head'>
        {portfolio.name}, {label}
      </span>
    </p>
  );
}

/**
 * The feature's folio. It stays at the foot of the screen, turns over as the
 * reader reaches each block, and its rule fills with the distance read. It
 * follows the scroll directly and never animates by itself.
 */
export function FolioTracker({ start, label }: { start: number; label: string }) {
  const [folio, setFolio] = useState(start);
  const rule = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pages = [...document.querySelectorAll<HTMLElement>('[data-folio]')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const room = document.documentElement.scrollHeight - height;
      const read = room > 0 ? Math.min(window.scrollY / room, 1) : 0;
      if (rule.current) rule.current.style.transform = `scaleX(${read})`;
      let current = start;
      for (const page of pages) {
        if (page.getBoundingClientRect().top > height * 0.6) break;
        current = Number(page.dataset.folio);
      }
      setFolio(current);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, [start]);

  return (
    <div className='folio--tracker' aria-hidden='true'>
      <span className='folio-rule' ref={rule} />
      {/* Two fixed slots: the number changes sides without moving anything. */}
      <span className='folio-number' key={`left-${folio}`}>
        {folio % 2 === 0 ? folio : ''}
      </span>
      <span className='folio-head'>{label}</span>
      <span className='folio-number' key={`right-${folio}`}>
        {folio % 2 === 1 ? folio : ''}
      </span>
    </div>
  );
}
