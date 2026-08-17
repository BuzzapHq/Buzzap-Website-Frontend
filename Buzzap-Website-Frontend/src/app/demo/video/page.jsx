import VideoDemoClient from './VideoDemoClient';

export const metadata = {
  title: 'AI Automation Video Walkthrough | Buzzap Innovations',
  description: 'Watch the full video demonstration of Buzzap Innovations’ AI lead generation, CRM automation, and voice agent system.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/demo/video',
  },
  openGraph: {
    title: 'AI Automation Video Walkthrough | Buzzap Innovations',
    description: 'Watch the full video demonstration of Buzzap Innovations’ AI lead generation, CRM automation, and voice agent system.',
    url: 'https://www.buzzaphq.com/demo/video',
  },
};

export default function VideoDemoPage() {
  return <VideoDemoClient />;
}