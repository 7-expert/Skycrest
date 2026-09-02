import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';

const barlowCondensed = Barlow_Condensed({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-condensed',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://skycrest.com'),
  title: 'Skycrest | Global Heavy Engineering & Infrastructure Construction',
  description: 'Skycrest is an international leader in large-scale commercial high-rise, heavy industrial energy plants, civil transportation, and infrastructure engineering.',
  keywords: ['Skycrest Construction', 'Heavy Industry', 'Infrastructure Engineering', 'EPC Construction', 'Commercial High-Rise', 'Industrial Engineering'],
  authors: [{ name: 'Skycrest Engineering Group' }],
  openGraph: {
    title: 'Skycrest | Global Heavy Engineering & Infrastructure Construction',
    description: 'Engineering excellence at monumental scale. Turnkey EPC solutions across commercial, industrial, and civil infrastructure sectors.',
    url: 'https://skycrest.com',
    siteName: 'Skycrest Corporate',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Skycrest Heavy Construction Project Site',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-charcoal text-off-white font-body antialiased selection:bg-amber-gold selection:text-charcoal" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
