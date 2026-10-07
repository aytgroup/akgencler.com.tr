import { NextResponse } from "next/server";

export function GET() {
  const base = "https://akgencler.com.tr";
  const pages = [
    { url: "/", priority: "1.0", freq: "daily" },
    { url: "/kesfet", priority: "0.9", freq: "daily" },
    { url: "/etkinlikler", priority: "0.8", freq: "weekly" },
    { url: "/topluluklar", priority: "0.8", freq: "weekly" },
    { url: "/mesajlar", priority: "0.6", freq: "daily" },
    { url: "/kaydet", priority: "0.5", freq: "weekly" },
    { url: "/giris", priority: "0.7", freq: "monthly" },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${base}${p.url}</loc>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}