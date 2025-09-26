import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Anugrah Surya Putra - Mobile Engineer Portfolio",
    template: "%s | Anugrah Surya Putra",
  },
  description:
    "Passionate Mobile Engineer with 2+ years of experience developing cross-platform applications using Flutter and Kotlin Multiplatform. Specialized in crafting clean, maintainable code and collaborating in Agile teams to deliver seamless user experiences.",
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
    "Flutter",
    "Kotlin",
    "Dart",
    "Android",
    "Firebase",
    "REST API",
    "Git",
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
    title: "Anugrah Surya Putra - Mobile Engineer Portfolio",
    description:
      "Passionate Mobile Engineer with 2+ years of experience developing cross-platform applications using Flutter and Kotlin Multiplatform.",
    siteName: "Anugrah Surya Putra Portfolio",
    images: [
      {
        url: "/images/photo/photo.png",
        width: 1200,
        height: 630,
        alt: "Anugrah Surya Putra - Mobile Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anugrah Surya Putra - Mobile Engineer Portfolio",
    description:
      "Passionate Mobile Engineer with 2+ years of experience developing cross-platform applications using Flutter and Kotlin Multiplatform.",
    images: ["/images/photo/photo.png"],
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
