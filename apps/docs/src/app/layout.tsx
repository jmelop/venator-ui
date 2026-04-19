import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              const stored = localStorage.getItem('venator-theme');
              const theme = stored || 'dark';
              document.documentElement.classList.toggle('dark', theme === 'dark');
              document.documentElement.setAttribute('data-theme', theme);
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
