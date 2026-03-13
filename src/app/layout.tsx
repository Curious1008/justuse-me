import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light')}catch(e){}})();`;

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
  metadataBase: new URL("https://justuse.me"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <GoogleAnalytics />
      <body
        className={`${sora.variable} ${dmSans.variable} font-[family-name:var(--font-dm-sans)] min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
