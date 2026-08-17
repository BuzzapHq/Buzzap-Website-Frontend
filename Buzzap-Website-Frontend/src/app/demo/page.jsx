import DemoClient from './DemoClient';

export const metadata = {
  title: 'Interactive AI Growth System Demo | Buzzap Innovations',
  description: 'Watch Buzzap Innovations interactive product demo. See how our AI growth infrastructure automates lead qualification and booking end-to-end.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/demo',
  },
  openGraph: {
    title: 'Interactive AI Growth System Demo | Buzzap Innovations',
    description: 'Watch Buzzap Innovations interactive product demo. See how our AI growth infrastructure automates lead qualification and booking end-to-end.',
    url: 'https://www.buzzaphq.com/demo',
  },
};

export default function DemoPage() {
  return <DemoClient />;
}
