import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AKGENÇLER — Türkiye'nin Gençlik Platformu",
  description: "Türkiye'nin akil ve ak gençlerinin buluşma noktası. Fikir paylaş, topluluk kur, bağlantı kur.",
  keywords: "akgençler, türkiye, gençlik, sosyal platform, topluluk",
  openGraph: {
    title: "AKGENÇLER",
    description: "Türkiye'nin akil ve ak gençlerinin buluşma noktası.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full bg-[#f8f9fa] text-[#1a1a2e]">
        {children}
      </body>
    </html>
  );
}
