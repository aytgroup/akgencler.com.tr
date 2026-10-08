import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://akgencler.com.tr';
  return [
    { url: base + '/', lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: base + '/kesfet', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: base + '/etkinlikler', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: base + '/topluluklar', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: base + '/mesajlar', lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
    { url: base + '/kaydet', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: base + '/giris', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];
}
