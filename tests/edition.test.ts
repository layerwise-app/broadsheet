import { describe, expect, it } from 'vitest';
import { editionFor, toRoman } from '~/lib/edition';

const options = { foundedOn: '2014-03-17', timeZone: 'Europe/Lisbon' };

describe('the masthead edition', () => {
  it('counts issue one on the founding day', () => {
    const edition = editionFor(new Date('2014-03-17T12:00:00Z'), options);
    expect(edition).toMatchObject({ volume: 'I', issue: '1' });
  });

  it('turns the volume on the anniversary', () => {
    expect(editionFor(new Date('2015-03-16T12:00:00Z'), options).volume).toBe('I');
    expect(editionFor(new Date('2015-03-17T12:00:00Z'), options).volume).toBe('II');
  });

  it('prints the date in the owner’s time zone', () => {
    const edition = editionFor(new Date('2026-11-02T23:30:00Z'), {
      ...options,
      timeZone: 'Asia/Tokyo'
    });
    expect(edition.date).toBe('Tuesday 3 November 2026');
  });

  it('writes Roman numerals', () => {
    expect([1, 4, 9, 13, 40].map(toRoman)).toEqual(['I', 'IV', 'IX', 'XIII', 'XL']);
  });
});
