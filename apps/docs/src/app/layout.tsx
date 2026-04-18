import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LandingNav } from '../components/LandingNav';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Venator UI',
  description:
    'A React + TypeScript UI infrastructure for building modern web interfaces, data-driven tools and AI-assisted applications.',
  icons: {
    icon: '/venator-favicon-32.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LandingNav />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
