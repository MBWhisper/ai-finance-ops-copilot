import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = "https://www.aifinanceops.app"

export const metadata: Metadata = {
  title: "AI Finance Ops — AI-Powered Financial Dashboard",
  description:
    "Automate your financial operations with AI. Track expenses, forecasts, and reports in one place.",
  verification: {
    google: "1NQbqNBgfNMHO8EVZMrgTnecpO7RqWig1imtmKAMDyk",
  },
  openGraph: {
    title: "AI Finance Ops",
    description: "AI-Powered Financial Dashboard",
    url: baseUrl,
    siteName: "AI Finance Ops",
    images: [
      {
        url: `${baseUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "AI Finance Ops Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Finance Ops",
    description: "AI-Powered Financial Dashboard",
    images: [`${baseUrl}/og-image.svg`],
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
        {children}
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''} />
      </body>
    </html>
  );
}
