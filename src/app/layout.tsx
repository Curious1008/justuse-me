import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JustUse.me — Free Online PDF, Image & Text Tools",
    template: "%s | JustUse.me",
  },
  description:
    "Free online tools to merge PDFs, compress images, format JSON, and 25+ more. No ads, no sign-up, no watermarks. Files never leave your browser.",
  metadataBase: new URL("https://justuse.me"),
  alternates: {
    canonical: "https://justuse.me",
  },
  openGraph: {
    title: "JustUse.me — Free Online Tools",
    description:
      "30+ free online tools for PDFs, images, and text. No ads, no sign-up, privacy-first — files never leave your browser.",
    url: "https://justuse.me",
    siteName: "JustUse.me",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "JustUse.me — Free Online Tools",
    description:
      "30+ free tools. No ads, no sign-up. Files stay in your browser.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body
        className={`${sora.variable} ${dmSans.variable} font-[family-name:var(--font-dm-sans)] min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
