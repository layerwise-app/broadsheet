/// <reference types="vite/client" />
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useLocation
} from '@tanstack/react-router';
import type * as React from 'react';
import { ErrorPage } from '~/components/ErrorPage';
import { Footer } from '~/components/Footer';
import { Masthead, RunningHead } from '~/components/Masthead';
import { NotFound } from '~/components/NotFound';
import { editionFor } from '~/lib/edition';
import { fontLoaderScript, themeCss } from '~/lib/theme';
import { site } from '~/lib/site';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';
import '~/styles/app.css';

export const Route = createRootRoute({
  // The date is set once on the server, so the browser hydrates the same text.
  loader: () => ({ edition: editionFor(new Date(), portfolio) }),
  // Site-wide defaults; each page's `seo()` overrides tags with the same name.
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: portfolio.colors.paper },
      ...(site.googleSiteVerification
        ? [
            {
              name: 'google-site-verification',
              content: site.googleSiteVerification
            }
          ]
        : []),
      ...seo({ title: site.name, description: site.description }).meta
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ],
    scripts: [{ children: fontLoaderScript() }]
  }),
  errorComponent: (props) => (
    <RootDocument>
      <ErrorPage {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => <NotFound />,
  component: RootComponent
});

function RootComponent() {
  const { edition } = Route.useLoaderData();
  const onFrontPage = useLocation({ select: (location) => location.pathname === '/' });
  return (
    <RootDocument>
      <a className='skip-link' href='#main'>
        Skip to the story
      </a>
      {onFrontPage ? <Masthead edition={edition} /> : <RunningHead edition={edition} />}
      <Outlet />
      <Footer />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
        {/* Colours and font choices come from src/portfolio.config.ts. */}
        <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
