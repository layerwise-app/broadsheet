import { portfolio } from '~/portfolio.config';

/** The CSS the config controls: the colours and which fonts to use. */
export function themeCss() {
  const { fonts, colors } = portfolio;
  return [
    ':root{',
    `--paper:${colors.paper};--ink:${colors.ink};--ink-soft:${colors.inkSoft};--accent:${colors.accent};--on-accent:${colors.onAccent};`,
    `--font-text:'${fonts.text.family}',${fonts.text.fallback};`,
    `--font-display:'${fonts.display.family}',${fonts.display.fallback};`,
    // The nameplate's width in ems, so any name fits the page on one line.
    `--nameplate-em:${(portfolio.name.length * 0.445).toFixed(2)};`,
    '}'
  ].join('');
}

/**
 * Runs in the head, once the stylesheet has arrived. Starts decoding the embedded
 * fonts straight away, so the page's first layout already uses them.
 */
export function fontLoaderScript() {
  const { text, display } = portfolio.fonts;
  const faces = [
    `400 1em "${text.family}"`,
    `italic 400 1em "${text.family}"`,
    `700 1em "${display.family}"`,
    `italic 500 1em "${display.family}"`
  ];
  return `if(document.fonts)${JSON.stringify(faces)}.forEach(function(f){document.fonts.load(f)})`;
}
