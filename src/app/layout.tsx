import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
    default: "JustUse.me — Free Online Tools",
    template: "%s | JustUse.me",
  },
  description:
    "Clean, ad-free online tools. Merge PDFs, compress images, format JSON, and more. Your files never leave your device.",
  metadataBase: new URL("https://justuse.me"),
  openGraph: {
    title: "JustUse.me — Free Online Tools",
    description:
      "Clean, ad-free online tools. Merge PDFs, compress images, format JSON, and more. Privacy-first — files never leave your device.",
    url: "https://justuse.me",
    siteName: "JustUse.me",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "JustUse.me — Free Online Tools",
    description:
      "Clean, ad-free online tools. Privacy-first — files never leave your device.",
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
