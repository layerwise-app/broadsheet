import { createIsomorphicFn } from '@tanstack/react-start';
import { getRequestUrl } from '@tanstack/react-start/server';
import { portfolio } from '~/portfolio.config';

type Site = {
  name: string;
  description: string;
  /**
   * The address search engines should index, like `https://noorcastellan.com`.
   * Empty uses the address each visitor opened. Set it when a custom domain is
   * connected, so the layerwise.site address isn't indexed as a copy.
   */
  url: string;
  /** Default share image: a 1200×630 JPG in `public/`. Case studies use their cover. */
  image: string;
  imageAlt: string;
  /** The `content` of Google Search Console's HTML tag, if it's used. */
  googleSiteVerification: string;
};

/** What search engines and link previews read about this site. */
export const site: Site = {
  name: portfolio.name,
  description: portfolio.summary,
  url: '',
  image: '/og-image.jpg',
  imageAlt: `The front page of ${portfolio.name}'s portfolio, set like a printed newspaper.`,
  googleSiteVerification: ''
};

/** Fixed public pages in `/sitemap.xml`. Case studies are added automatically. */
export const sitemapPaths: string[] = ['/', '/work', '/about', '/contact'];

const requestOrigin = createIsomorphicFn()
  .server(() => getRequestUrl().origin)
  .client(() => window.location.origin);

/** Absolute URL for a path or a `public/` file on this site. */
export function siteUrl(path = '/'): string {
  return new URL(path, site.url || requestOrigin()).toString();
}

/** schema.org data for the owner. It must match what the pages show. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolio.name,
    url: siteUrl('/'),
    jobTitle: portfolio.role,
    description: portfolio.summary,
    image: siteUrl(site.image),
    address: {
      '@type': 'PostalAddress',
      addressLocality: portfolio.location,
      addressCountry: portfolio.country
    },
    sameAs: portfolio.socials.map((social) => social.href)
  };
}
