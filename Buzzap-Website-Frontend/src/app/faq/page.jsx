import FaqClient from './FaqClient';

export const metadata = {
  title: 'Frequently Asked Questions | Buzzap Innovations',
  description: 'Find answers to common questions about Buzzap Innovations AI agency, services, lead automations, pricing, setup timelines, and performance guarantees.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Buzzap Innovations',
    description: 'Find answers to common questions about Buzzap Innovations AI agency, services, lead automations, pricing, setup timelines, and performance guarantees.',
    url: 'https://www.buzzaphq.com/faq',
  },
};

export default function FAQPage() {
  return <FaqClient />;
}
