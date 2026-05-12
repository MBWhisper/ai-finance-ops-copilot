import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'AI Finance Ops — Intelligent Financial Copilot',
  description: 'AI Finance Ops is your intelligent financial copilot — automate reporting, track KPIs, forecast cash flow, and make smarter decisions faster.',
  metadataBase: new URL('https://www.aifinanceops.app'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  verification: {
    google: "1NQbqNBgfNMHO8EVZMrgTnecpO7RqWig1imtmKAMDyk",
  },
  openGraph: {
    title: 'AI Finance Ops — Intelligent Financial Copilot',
    description: 'AI Finance Ops is your intelligent financial copilot — automate reporting, track KPIs, forecast cash flow, and make smarter decisions faster.',
    url: 'https://www.aifinanceops.app',
    siteName: 'AI Finance Ops',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Finance Ops Dashboard',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Finance Ops — Intelligent Financial Copilot',
    description: 'AI Finance Ops is your intelligent financial copilot — automate reporting, track KPIs, forecast cash flow, and make smarter decisions faster.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <SpeedInsights />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YVDQPYBP9Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YVDQPYBP9Y');
          `}
        </Script>
      </body>
    </html>
  );
}
