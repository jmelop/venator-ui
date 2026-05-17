import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Venator UI',
  description:
    'A React + TypeScript UI system. From primitives to patterns to full application architectures — shipped via CLI.',
  icons: {
    icon: '/venator-favicon-32.png',
  },
  openGraph: {
    title: 'Venator UI — Build fast. Scale correctly.',
    description:
      'A React + TypeScript UI system. Primitives, structural patterns, and full application architectures — all layered, all opt-in, shipped via CLI.',
    url: 'https://www.venatorui.com',
    siteName: 'Venator UI',
    images: [
      {
        url: 'https://www.venatorui.com/venator-og.png',
        width: 1200,
        height: 630,
        alt: 'Venator UI — Build fast. Scale correctly.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Venator UI — Build fast. Scale correctly.',
    description:
      'A React + TypeScript UI system. Primitives, structural patterns, and full application architectures — shipped via CLI.',
    images: ['https://www.venatorui.com/venator-og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
  (function() {
    try {
      const stored = localStorage.getItem('venator-theme');
      const theme = stored || 'dark';
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    } catch(e) {}
  })();
`}} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div>{children}</div>
      </body>
    </html>
  );
}
