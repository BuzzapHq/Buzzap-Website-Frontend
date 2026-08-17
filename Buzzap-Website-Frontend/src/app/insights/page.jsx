import InsightsClient from './InsightsClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buzzaphq.com';

export const metadata = {
  title: 'AI Marketing & Growth Insights | Buzzap Innovations Blog',
  description: 'Read frameworks, playbooks, and documented AI marketing strategies from the engineering team at Buzzap Innovations.',
  alternates: {
    canonical: `${siteUrl}/insights`,
  },
  openGraph: {
    title: 'AI Marketing & Growth Insights | Buzzap Innovations Blog',
    description: 'Read frameworks, playbooks, and documented AI marketing strategies from the engineering team at Buzzap Innovations.',
    url: `${siteUrl}/insights`,
  },
};

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${siteUrl}/insights/#blog`,
  name: 'Buzzap Innovations Blog & Insights',
  description: 'Frameworks, playbooks, and documented AI marketing strategies from the engineering team at Buzzap Innovations.',
  url: `${siteUrl}/insights`,
  publisher: {
    '@type': 'Organization',
    name: 'Buzzap Innovations',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
  },
};

export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <InsightsClient />
    </>
  );
}
