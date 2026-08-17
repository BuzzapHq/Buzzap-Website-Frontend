import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Buzzap Innovations — AI Growth Systems & Infrastructure Agency',
  description: 'Learn about Buzzap Innovations. We build integrated AI growth systems, automated lead generation, CRM pipelines, and voice agents for ambitious businesses.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/about',
  },
  openGraph: {
    title: 'About Buzzap Innovations — AI Growth Systems & Infrastructure Agency',
    description: 'Learn about Buzzap Innovations. We build integrated AI growth systems, automated lead generation, CRM pipelines, and voice agents for ambitious businesses.',
    url: 'https://www.buzzaphq.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
