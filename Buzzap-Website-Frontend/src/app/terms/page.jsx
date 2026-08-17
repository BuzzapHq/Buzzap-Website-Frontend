import TermsClient from './TermsClient';

export const metadata = {
  title: 'Terms of Service | Buzzap Innovations',
  description: 'Read the Terms of Service for Buzzap Innovations. Understand the service terms, client obligations, intellectual property rights, and payment policies.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | Buzzap Innovations',
    description: 'Read the Terms of Service for Buzzap Innovations. Understand the service terms, client obligations, intellectual property rights, and payment policies.',
    url: 'https://www.buzzaphq.com/terms',
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
