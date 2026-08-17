import PrivacyClient from './PrivacyClient';

export const metadata = {
  title: 'Privacy Policy | Buzzap Innovations',
  description: 'Read the Privacy Policy of Buzzap Innovations. Learn how we collect, use, store, and protect your personal data under GDPR and international privacy standards.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Buzzap Innovations',
    description: 'Read the Privacy Policy of Buzzap Innovations. Learn how we collect, use, store, and protect your personal data under GDPR and international privacy standards.',
    url: 'https://www.buzzaphq.com/privacy',
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
