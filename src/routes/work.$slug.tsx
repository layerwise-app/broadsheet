import { createFileRoute, notFound } from '@tanstack/react-router';
import { Feature } from '~/components/Feature';
import { getFeature } from '~/content/queries';
import { siteUrl } from '~/lib/site';
import { portfolio } from '~/portfolio.config';
import { seo } from '~/utils/seo';

export const Route = createFileRoute('/work/$slug')({
  loader: async ({ params }) => {
    const feature = await getFeature({ data: { slug: params.slug } });
    if (!feature) throw notFound();
    return feature;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { project } = loaderData;
    const shareImage = project.cover.image.share;
    return seo({
      title: `${project.title}, ${project.kind.toLowerCase()} by ${portfolio.name}`,
        description: project.outcome,
        path: `/work/${params.slug}`,
        image: shareImage,
        imageAlt: project.cover.alt,
        type: 'article',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: project.headline,
          description: project.deck,
          image: shareImage ? siteUrl(shareImage) : undefined,
          datePublished: `${project.year}-01-01`,
          author: {
            '@type': 'Person',
            name: portfolio.name,
            url: siteUrl('/')
          }
        }
      });
  },
  component: FeaturePage
});

function FeaturePage() {
  const { project, folio, next } = Route.useLoaderData();
  // Keyed so that moving to the next feature starts its folio again.
  return <Feature key={project.slug} project={project} folio={folio} next={next} />;
}
