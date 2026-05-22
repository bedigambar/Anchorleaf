import type { Metadata, Viewport } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageTransition from "@/components/ui/PageTransition";
import CommandPalette from "@/components/ui/CommandPalette";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anchorleaf | Find Your Steadiness",
  description:
    "Anchorleaf helps you understand your emotions, learn DBT skills, and find steadiness, one day at a time. A free educational platform for people navigating BPD.",
  keywords: ["DBT", "BPD", "mental health", "dialectical behavior therapy", "borderline personality disorder", "emotional wellness"],
  openGraph: {
    title: "Anchorleaf | Find Your Steadiness",
    description: "An emotionally safe, beautifully designed DBT companion for people navigating BPD.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fdf8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600&family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
