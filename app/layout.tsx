import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header, Footer } from "@/components/layout";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { CommandPaletteProvider } from "@/components/ui/command-palette-provider";
import { getSEOConfig } from "@/lib/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const seo = getSEOConfig();

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl || 'https://ayushkamboj.dev'),
  title: {
    default: seo.title,
    template: `%s | ${seo.author}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: seo.author }],
  creator: seo.author,
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: seo.siteUrl,
    title: seo.title,
    description: seo.description,
    siteName: seo.title,
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: `${seo.author} - ${seo.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    creator: seo.twitterHandle,
    images: ['/og-image.svg'],
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
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <ScrollProgress />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
            <CommandPaletteProvider />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
