import type { Metadata, Viewport } from 'next';
import { Oswald } from 'next/font/google';
import './globals.css';

const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: { default: 'LinkHub', template: '%s | LinkHub' },
  robots: 'noindex',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ fontFamily: 'var(--font-oswald), sans-serif' }}>{children}</body>
    </html>
  );
}
