import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DebateHeat",
    template: "%s | DebateHeat",
  },
  description:
    "Multi-agent brainstorming debates with quantitative and qualitative heatmaps — daily morning brief.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-white"
            >
              DebateHeat
            </Link>
            <nav className="flex flex-wrap gap-4 text-sm text-zinc-400">
              <Link className="transition hover:text-white" href="/#docs">
                Docs
              </Link>
              <Link className="transition hover:text-white" href="/brief/latest">
                Latest brief
              </Link>
              <Link className="transition hover:text-white" href="/api/session/2026-03-22">
                Sample JSON
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
