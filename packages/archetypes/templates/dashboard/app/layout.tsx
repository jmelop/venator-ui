import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@venator-ui/ui';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Built with Venator',
  icons: {
    icon: 'https://venator-ui-docs.vercel.app/venator-logo-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
