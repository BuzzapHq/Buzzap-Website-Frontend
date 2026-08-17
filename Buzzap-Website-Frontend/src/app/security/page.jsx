import SecurityClient from './SecurityClient';

export const metadata = {
  title: 'Data Security & System Infrastructure | Buzzap Innovations',
  description: 'Learn about Buzzap Innovations security practices. TLS encryption, AES-256 at rest, SOC 2 Type II providers, role-based access, and GDPR compliance.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/security',
  },
  openGraph: {
    title: 'Data Security & System Infrastructure | Buzzap Innovations',
    description: 'Learn about Buzzap Innovations security practices. TLS encryption, AES-256 at rest, SOC 2 Type II providers, role-based access, and GDPR compliance.',
    url: 'https://www.buzzaphq.com/security',
  },
};

export default function SecurityPage() {
  return <SecurityClient />;
}
