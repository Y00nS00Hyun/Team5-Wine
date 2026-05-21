'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.scss';
import './reset.scss';
import Provider from '@/components/provider/Provider';
import GNB from '@/components/gnb/GNB';

const inter = Inter({ subsets: ['latin'] });

const AUTH_ONLY_PATHS = new Set(['/login', '/signup']);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ONLY_PATHS.has(pathname);
  const showBackground = isAuthPage || pathname === '/';

  return (
    <html lang="en">
      <body className={`${inter.className} ${showBackground ? 'auth-background' : ''}`}>
        <Provider>
          {!isAuthPage && <GNB />}
          {children}
        </Provider>
      </body>
    </html>
  );
}
