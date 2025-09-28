import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Anugrah Surya Putra - Mobile Engineer Portfolio | Flutter & Kotlin Expert",
    template: "%s | Anugrah Surya Putra - Mobile Engineer",
  },
  description:
    "🚀 Passionate Mobile Engineer with 2+ years of experience developing cross-platform applications using Flutter and Kotlin Multiplatform. Specialized in crafting clean, maintainable code and collaborating in Agile teams to deliver seamless user experiences. Currently working at PT. Bangun Rancang Indonesia Kita (BRIK) - Jakarta, Indonesia.",
  keywords: [
    "mobile engineer",
    "flutter developer",
    "kotlin multiplatform",
    "android developer",
    "cross-platform development",
    "mobile app development",
    "clean architecture",
    "API integration",
    "performance optimization",
    "CI/CD",
    "mobile portfolio",
    "Anugrah Surya Putra",
    "Jakarta developer",
    "Indonesia mobile developer",
    "mobile engineer Indonesia",
    "Flutter developer Jakarta",
    "Kotlin expert Indonesia",
    "Flutter",
    "Kotlin",
    "Dart",
    "Android",
    "Firebase",
    "REST API",
    "Git",
    "mobile engineer BRIK",
    "cross-platform apps Indonesia",
    "Flutter apps Jakarta",
    "mobile development consultant",
    "app developer Indonesia",
    "mobile software engineer",
    "Flutter freelancer",
    "Kotlin Multiplatform developer",
  ],
  authors: [{ name: "Anugrah Surya Putra" }],
  creator: "Anugrah Surya Putra",
  publisher: "Anugrah Surya Putra",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://itsyourboyputra.vercel.app/",
    title: "Anugrah Surya Putra - Mobile Engineer Portfolio | Flutter & Kotlin Expert",
    description:
      "🚀 Passionate Mobile Engineer with 2+ years of experience developing cross-platform applications using Flutter and Kotlin Multiplatform. Currently at PT. Bangun Rancang Indonesia Kita (BRIK) - Jakarta, Indonesia. Specialized in clean architecture, CI/CD, and performance optimization.",
    siteName: "Anugrah Surya Putra - Mobile Engineer Portfolio",
    images: [
      {
        url: "/images/photo/photo.png",
        width: 1200,
        height: 630,
        alt: "Anugrah Surya Putra - Mobile Engineer specializing in Flutter and Kotlin Multiplatform development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anugrah Surya Putra - Mobile Engineer Portfolio | Flutter & Kotlin Expert",
    description:
      "🚀 Passionate Mobile Engineer with 2+ years of experience developing cross-platform applications using Flutter and Kotlin Multiplatform. Currently at PT. BRIK - Jakarta, Indonesia.",
    images: ["/images/photo/photo.png"],
    creator: "@anugrahsputra",
  },
  verification: {
    google: "UNzsS_OM9oAp-ntWRGrJXh7XUCQh-hRlSBZkjk3IsyI",
  },
  alternates: {
    canonical: "https://itsyourboyputra.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/images/photo/photo.png" as="image" type="image/png" />
        <link rel="preload" href="/json/AnugrahSuryaPutra_resume.json" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/json/projects.json" as="fetch" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//raw.githubusercontent.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//pub.dev" />
        
        {/* Preconnect for analytics */}
        <link rel="preconnect" href="https://vitals.vercel-analytics.com" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple mobile web app */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Anugrah Portfolio" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
