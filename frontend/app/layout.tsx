import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import { Toaster } from 'sonner';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './globals.css';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ThemeProvider } from '@/components/providers/theme-provider';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'BookMook',
  description:
    'A modern online bookstore with curated shelves, elegant discovery, and a polished reading-first shopping experience.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${manrope.variable} font-sans`}>
        <ThemeProvider>
          <div className="relative min-h-screen overflow-hidden">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
