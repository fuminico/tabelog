import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Tabelog Clone | 簡易レビューサイト",
  description: "Next.jsを使用して構築されたシンプルな店舗レビューサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="dark">
      <body className={cn("min-h-screen font-sans antialiased", notoSansJp.className)}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="container mx-auto flex-grow p-4 md:p-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
