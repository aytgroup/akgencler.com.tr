import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";
import ToastContainer from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akgencler.com.tr"),
  title: {
    default: "AKGENÇLER — Türkiye'nin Ak ve Âkil Gençlik Platformu",
    template: "%s | AKGENÇLER",
  },
  description: "Türkiye'nin ak ve âkil gençlerinin buluşma noktası. Fikir paylaş, etkinlik oluştur, topluluk kur, bağlantı kur. #akgençlergeliyor",
  keywords: [
    "akgençler", "akgencler", "türkiye gençlik platformu", "gençlik sosyal medya",
    "islami gençlik", "ak gençlik", "türk gençleri", "gençlik topluluğu",
    "etkinlik", "topluluk", "sosyal platform", "akgençlergeliyor",
  ],
  authors: [{ name: "AKGENÇLER", url: "https://akgencler.com.tr" }],
  creator: "AKGENÇLER",
  publisher: "AKGENÇLER",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://akgencler.com.tr",
  },
  openGraph: {
    title: "AKGENÇLER — Türkiye'nin Ak ve Âkil Gençlik Platformu",
    description: "Türkiye'nin ak ve âkil gençlerinin buluşma noktası. #akgençlergeliyor",
    url: "https://akgencler.com.tr",
    siteName: "AKGENÇLER",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AKGENÇLER — Türkiye'nin Ak ve Âkil Gençlik Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKGENÇLER — Türkiye'nin Ak ve Âkil Gençlik Platformu",
    description: "Türkiye'nin ak ve âkil gençlerinin buluşma noktası. #akgençlergeliyor",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "5QMM1IiFeSuTFfcbhyOEm1B5BK_aYEYOkAmu09utiSA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${geistSans.variable} h-full`}>
      <head>
        <meta name="google-site-verification" content="5QMM1IiFeSuTFfcbhyOEm1B5BK_aYEYOkAmu09utiSA" />
      </head>
      <body className="min-h-full bg-[#f8f9fa] text-[#1a1a2e]">
        <AuthGuard>
          {children}
        </AuthGuard>
        <ToastContainer />
      </body>
    </html>
  );
}
