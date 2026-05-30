import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: 'AI Finance Ops — Intelligent Financial Copilot',
  description: 'AI Finance Ops is your intelligent financial copilot — automate reporting, track KPIs, forecast cash flow, and make smarter decisions faster.',
  metadataBase: new URL('https://aifinanceops.app'),
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
    url: 'https://aifinanceops.app',
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
      <head>
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/114f1c65c7803024b24a9b80/script.js"
          strategy="beforeInteractive"
          type="text/javascript"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <>
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
          </>
        )}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script id="google-adsense" async strategy="afterInteractive" crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('consent', 'default', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'wait_for_update': 500,
                  });
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} ${inter.className}`}>
        {children}
        <CookieBanner />
        <SpeedInsights />
      </body>
    </html>
  );
}
