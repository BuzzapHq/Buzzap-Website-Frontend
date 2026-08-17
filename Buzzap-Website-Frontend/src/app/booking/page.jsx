import BookingClient from './BookingClient';

export const metadata = {
  title: 'Book a Free AI Strategy & Growth Audit Call | Buzzap Innovations',
  description: 'Schedule a free 30-minute AI strategy audit call with Buzzap Innovations. Get a custom roadmap for AI lead generation, CRM automation, and revenue scaling.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/booking',
  },
  openGraph: {
    title: 'Book a Free AI Strategy & Growth Audit Call | Buzzap Innovations',
    description: 'Schedule a free 30-minute AI strategy audit call with Buzzap Innovations. Get a custom roadmap for AI lead generation, CRM automation, and revenue scaling.',
    url: 'https://www.buzzaphq.com/booking',
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
