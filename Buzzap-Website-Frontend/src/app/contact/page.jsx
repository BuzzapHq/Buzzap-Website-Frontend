import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Buzzap Innovations — AI Growth Strategists & Engineers',
  description: 'Get in touch with Buzzap Innovations. Speak with our AI growth strategists and automation engineers to discuss your revenue pipeline.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/contact',
  },
  openGraph: {
    title: 'Contact Buzzap Innovations — AI Growth Strategists & Engineers',
    description: 'Get in touch with Buzzap Innovations. Speak with our AI growth strategists and automation engineers to discuss your revenue pipeline.',
    url: 'https://www.buzzaphq.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
