import PricingClient from './PricingClient';

export const metadata = {
  title: 'Transparent Pricing & AI Infrastructure Plans | Buzzap Innovations',
  description: 'Explore Buzzap Innovations pricing plans. Flexible AI marketing, CRM automation, and voice agent plans designed for scaling revenue.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/pricing',
  },
  openGraph: {
    title: 'Transparent Pricing & AI Infrastructure Plans | Buzzap Innovations',
    description: 'Explore Buzzap Innovations pricing plans. Flexible AI marketing, CRM automation, and voice agent plans designed for scaling revenue.',
    url: 'https://www.buzzaphq.com/pricing',
  },
};

export default function PricingPage(props) {
  return <PricingClient {...props} />;
}