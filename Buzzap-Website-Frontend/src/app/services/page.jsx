import ServicesClient from './ServicesClient';

export const metadata = {
  title: 'AI Marketing, SEO, CRM & Growth Services | Buzzap Innovations',
  description: 'Modular AI solutions engineered to capture leads, automate workflows, accelerate pipeline velocity, and scale enterprise revenue.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/services',
  },
  openGraph: {
    title: 'AI Marketing, SEO, CRM & Growth Services | Buzzap Innovations',
    description: 'Modular AI solutions engineered to capture leads, automate workflows, accelerate pipeline velocity, and scale enterprise revenue.',
    url: 'https://www.buzzaphq.com/services',
  },
};

export default function ServicesPage(props) {
  return <ServicesClient {...props} />;
}
