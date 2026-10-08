content = 'import { NextResponse } from "next/server";\n\nexport function GET() {\n  const base = "https://akgencler.com.tr";\n  const pages = [\n    { url: "/", priority: "1.0", freq: "daily" },\n    { url: "/kesfet", priority: "0.9", freq: "daily" },\n    { url: "/etkinlikler", priority: "0.8", freq: "weekly" },\n    { url: "/topluluklar", priority: "0.8", freq: "weekly" },\n    { url: "/mesajlar", priority: "0.6", freq: "daily" },\n    { url: "/kaydet", priority: "0.5", freq: "weekly" },\n    { url: "/giris", priority: "0.7", freq: "monthly" },\n  ];\n\n  const xml = [\n    `<?xml version="1.0" encoding="UTF-8"?>`,\n    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,\n    ...pages.map(\n      (p) =>\n        `  <url>\\n    <loc>${base}${p.url}</loc>\\n    <changefreq>${p.freq}</changefreq>\\n    <priority>${p.priority}</priority>\\n  </url>`\n    ),\n    `</urlset>`,\n  ].join("\\n");\n\n  return new NextResponse(xml, {\n    headers: { "Content-Type": "application/xml" },\n  });\n}\n'

with open(r'c:\Users\agity\Desktop\akgencler.com.tr\src\app\sitemap.xml\route.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('OK')
