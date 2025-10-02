import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { StickyMoka } from "@/components/common/StickyMoka";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Penguin - モカの世界へようこそ",
  description: "癒し・共感・成長支援を提供するコーヒーペンギンのモカの公式サイト。SNS、グッズ、最新情報をお届けします。",
  keywords: ["コーヒーペンギン", "モカ", "癒し", "キャラクター", "グッズ", "Suzuri"],
  authors: [{ name: "Coffee Penguin Team" }],
  openGraph: {
    title: "Coffee Penguin - モカの世界へようこそ",
    description: "癒し・共感・成長支援を提供するコーヒーペンギンのモカの公式サイト",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coffee Penguin - モカの世界へようこそ",
    description: "癒し・共感・成長支援を提供するコーヒーペンギンのモカの公式サイト",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <div
          className="h-16 bg-[var(--vintage-beige)]"
          aria-hidden="true"
        />
        <main className="min-h-screen">
          {children}
        </main>
        <div data-moka-section="footer">
          <Footer />
        </div>
        <StickyMoka />
      </body>
    </html>
  );
}




