import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@venator-ui/ui';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Built with Venator',
  icons: {
    icon: 'https://www.venatorui.com/venator-logo-icon.png',
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
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
