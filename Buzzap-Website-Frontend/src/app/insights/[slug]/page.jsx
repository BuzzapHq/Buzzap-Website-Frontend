import ArticleClient from './ArticleClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buzzaphq.com';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  const formattedTitle = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Article';
  const canonicalUrl = `${siteUrl}/insights/${slug}`;

  return {
    title: `${formattedTitle} | Buzzap Insights`,
    description: `Read the complete guide and AI growth framework on ${formattedTitle} by Buzzap Innovations.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${formattedTitle} | Buzzap Insights`,
      description: `Read the complete guide and AI growth framework on ${formattedTitle} by Buzzap Innovations.`,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || '';
  const formattedTitle = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Article';
  const canonicalUrl = `${siteUrl}/insights/${slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}/#article`,
        headline: formattedTitle,
        url: canonicalUrl,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Buzzap Innovations',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Insights',
            item: `${siteUrl}/insights`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: formattedTitle,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ArticleClient />
    </>
  );
}
