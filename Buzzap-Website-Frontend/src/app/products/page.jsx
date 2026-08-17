import ProductsClient from './ProductsClient';

export const metadata = {
  title: 'AI Products & Infrastructure Suite | Buzzap Innovations',
  description: 'Explore Buzzap Innovations’ AI products, smart automation tools, analytics platforms, and digital transformation suites for enterprise growth.',
  alternates: {
    canonical: 'https://www.buzzaphq.com/products',
  },
  openGraph: {
    title: 'AI Products & Infrastructure Suite | Buzzap Innovations',
    description: 'Explore Buzzap Innovations’ AI products, smart automation tools, analytics platforms, and digital transformation suites for enterprise growth.',
    url: 'https://www.buzzaphq.com/products',
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}