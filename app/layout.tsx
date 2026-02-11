import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import { copy } from "@/app/lib/ui/copy";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://generative-resume.vercel.app"),
  title: "genUIAI - 自動生成UI検証サイト",
  description:
    "AI SDK による Generative UI の検証・デモサイト。チャットで動的にカード・チャート・タイムラインなどをストリーミング表示します。",
  openGraph: {
    title: "genUIAI - 自動生成UI検証サイト",
    description:
      "AI SDK による Generative UI の検証・デモ。ストリーミングで動的UIを生成します。",
    images: ["/og?city=World"],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#252525" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow-sm"
          >
            {copy.layout.skipToContent}
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
