const ROMAN: [number, string][] = [
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
];

export function toRoman(value: number): string {
  let rest = value;
  let out = '';
  for (const [size, glyph] of ROMAN) {
    while (rest >= size) {
      out += glyph;
      rest -= size;
    }
  }
  return out;
}

export type Edition = { volume: string; issue: string; date: string };

const dayNumber = (year: number, month: number, day: number) =>
  Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);

/**
 * The masthead's line, worked out the way a newspaper's is: one volume for
 * each year since `foundedOn`, one issue for each day.
 */
export function editionFor(
  now: Date,
  options: { foundedOn: string; timeZone: string }
): Edition {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: options.timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).formatToParts(now);
  const part = (type: string) =>
    Number(parts.find((entry) => entry.type === type)?.value);
  const [year, month, day] = [part('year'), part('month'), part('day')];

  const [startYear, startMonth, startDay] = options.foundedOn
    .split('-')
    .map(Number);
  const issue =
    dayNumber(year, month, day) - dayNumber(startYear, startMonth, startDay) + 1;
  const passedAnniversary =
    month > startMonth || (month === startMonth && day >= startDay);
  const volume = year - startYear + (passedAnniversary ? 1 : 0);

  return {
    volume: toRoman(Math.max(volume, 1)),
    issue: new Intl.NumberFormat('en-GB').format(Math.max(issue, 1)),
    date: new Intl.DateTimeFormat('en-GB', {
      timeZone: options.timeZone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
      .format(now)
      .replace(',', '')
  };
}
