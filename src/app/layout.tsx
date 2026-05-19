import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
      <body className={`${inter.variable} ${inter.className}`}>
        {children}
        <SpeedInsights />
        <Script id="web-vitals" strategy="afterInteractive">
          {`
            function sendWebVital(metric) {
              if (typeof gtag !== 'undefined') {
                gtag('event', metric.name, {
                  value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                  event_label: metric.id,
                  non_interaction: true,
                });
              }
            }
            (function() {
              try {
                new PerformanceObserver(function(list) {
                  list.getEntries().forEach(function(entry) {
                    if (entry.entryType === 'largest-contentful-paint' || entry.entryType === 'first-input' || entry.entryType === 'layout-shift') {
                      sendWebVital({ name: entry.entryType === 'largest-contentful-paint' ? 'LCP' : entry.entryType === 'first-input' ? 'FID' : 'CLS', value: entry.entryType === 'layout-shift' ? entry.value : entry.startTime, id: entry.id || '' });
                    }
                  });
                }).observe({ type: 'largest-contentful-paint', buffered: true });
                new PerformanceObserver(function(list) {
                  list.getEntries().forEach(function(entry) {
                    sendWebVital({ name: 'FID', value: entry.processingStart - entry.startTime, id: entry.id || '' });
                  });
                }).observe({ type: 'first-input', buffered: true });
                new PerformanceObserver(function(list) {
                  list.getEntries().forEach(function(entry) {
                    sendWebVital({ name: 'CLS', value: entry.value, id: entry.id || '' });
                  });
                }).observe({ type: 'layout-shift', buffered: true });
              } catch(e) {}
            })();
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
