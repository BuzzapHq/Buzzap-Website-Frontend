import CaseStudiesClient from './CaseStudiesClient';

export const metadata = {
  title: 'Client Case Studies & Proven Results | Buzzap Innovations',
  description: 'Read documented case studies and revenue results from real clients using Buzzap Innovations AI growth systems across real estate, e-commerce, and SaaS.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/case-studies',
  },
  openGraph: {
    title: 'Client Case Studies & Proven Results | Buzzap Innovations',
    description: 'Read documented case studies and revenue results from real clients using Buzzap Innovations AI growth systems across real estate, e-commerce, and SaaS.',
    url: 'https://www.buzzaphq.com/case-studies',
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
