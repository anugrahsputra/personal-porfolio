import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://itsyourboyputra.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'YandexBot'],
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: ['SemrushBot', 'AhrefsBot', 'MJ12bot'],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}