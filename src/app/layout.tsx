import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const BASE_URL = "https://gssoc-tracker.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GSSoC PR Tracker — Track GSSoC 2026 Contributions, Points & Rankings",
    template: "%s | GSSoC PR Tracker",
  },
  description:
    "The unofficial community tracker for GirlScript Summer of Code 2026. Track contributor PR points, mentor review scores, and project leaderboards. Search any GitHub username to see live GSSoC stats. Built by PRODHOSH.",
  keywords: [
    "GSSoC 2026",
    "GSSoC PR Tracker",
    "GirlScript Summer of Code 2026",
    "GirlScript Summer of Code tracker",
    "GSSoC leaderboard",
    "GSSoC contributor points",
    "GSSoC mentor tracker",
    "GSSoC project admin",
    "open source contribution tracker",
    "GitHub PR tracker",
    "GSSoC ranking",
    "GSSoC scores",
    "GSSoC approved PRs",
    "open source GSSoC",
    "GSSoC points calculator",
  ],
  authors: [{ name: "PRODHOSH", url: "https://github.com/PRODHOSH" }],
  creator: "PRODHOSH",
  publisher: "PRODHOSH",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "GSSoC PR Tracker",
    title: "GSSoC PR Tracker — Track GSSoC 2026 Contributions & Points",
    description:
      "Track your GSSoC 2026 open-source journey. Search any GitHub username to see contributor points, mentor scores, merged PRs, and live rankings.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "GSSoC PR Tracker — community contribution tracker for GSSoC 2026",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@prodhosh",
    creator: "@prodhosh",
    title: "GSSoC PR Tracker — GSSoC 2026 Contributions & Rankings",
    description:
      "Track contributor points, mentor review scores, and repo leaderboards for GirlScript Summer of Code 2026.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "UaoSRKAHIpDzT6sD0-yziuiyGSNpEyp9RaDEA009Vcs",
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${BASE_URL}/#webapp`,
        name: "GSSoC PR Tracker",
        url: BASE_URL,
        description:
          "Unofficial community tracker for GirlScript Summer of Code 2026. Track contributor PR points, mentor review scores, and project leaderboards.",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author: {
          "@type": "Person",
          name: "PRODHOSH",
          url: "https://github.com/PRODHOSH",
        },
        inLanguage: "en",
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "GSSoC PR Tracker",
        description: "Track GSSoC 2026 contributions, points, and rankings.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/pr-tracker/{search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.github.com" />
      </head>
      <body className="min-h-screen">
        {children}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CLKFW028BD"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CLKFW028BD');
        `}</Script>
      </body>
    </html>
  );
}
