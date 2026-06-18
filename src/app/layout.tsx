import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
  alternates: {
    canonical: 'https://aifinanceops.app',
  },
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
        {/* Consent Mode v2 default — must fire before any GA/Ads tag */}
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
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'wait_for_update': 500,
              });
            `,
          }}
        />
        {/*
          Accessibility fix: Vercel toolbar / third-party widgets may inject
          <input type="range"> elements without accessible labels, which fails
          the "Focus elements must have labels" audit. This MutationObserver
          patches any such elements as soon as they appear in the DOM.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function labelUnlabeledInputs(root) {
                  root.querySelectorAll('input[type="range"]:not([aria-label]):not([aria-labelledby]):not([id])').forEach(function(el) {
                    el.setAttribute('aria-label', el.getAttribute('aria-label') || el.getAttribute('title') || 'Slider');
                  });
                  root.querySelectorAll('input[type="range"][id]').forEach(function(el) {
                    if (!document.querySelector('label[for="' + el.id + '"]') && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) {
                      el.setAttribute('aria-label', el.getAttribute('title') || 'Slider');
                    }
                  });
                  root.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(function(el) {
                    if (!el.textContent.trim()) {
                      el.setAttribute('aria-label', el.getAttribute('title') || 'Button');
                    }
                  });
                }
                if (typeof MutationObserver !== 'undefined') {
                  var obs = new MutationObserver(function(mutations) {
                    mutations.forEach(function(m) {
                      m.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                          labelUnlabeledInputs(node);
                        }
                      });
                    });
                  });
                  document.addEventListener('DOMContentLoaded', function() {
                    labelUnlabeledInputs(document);
                    obs.observe(document.body, { childList: true, subtree: true });
                  });
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
