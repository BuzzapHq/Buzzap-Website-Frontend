export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.buzzaphq.com';
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://buzzap-website-frontend.onrender.com'
      : 'http://localhost:5000');

  const routes = [
    '',
    '/services',
    '/brand',
    '/brand-showcase',
    '/case-studies',
    '/why-buzzap',
    '/products',
    '/pricing',
    '/insights',
    '/booking',
    '/contact',
    '/about',
    '/faq',
    '/demo',
    '/demo/video',
    '/privacy',
    '/terms',
    '/security',
  ];

  const currentDate = new Date().toISOString();

  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : route === '/insights' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/services' || route === '/insights' || route === '/booking' ? 0.9 : 0.8,
  }));

  let blogEntries = [];
  try {
    const res = await fetch(`${apiBase}/api/blog?limit=100`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.posts && Array.isArray(data.posts)) {
        blogEntries = data.posts.map((post) => ({
          url: `${baseUrl}/insights/${post.slug}`,
          lastModified: post.updatedAt || post.publishedAt || currentDate,
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
      }
    }
  } catch (err) {
    console.error('Error fetching blog posts for sitemap:', err);
  }

  return [...staticEntries, ...blogEntries];
}
