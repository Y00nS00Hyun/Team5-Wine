'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AUTH_PATHS = ['/login', '/signup'];

const useRedirectAuthenticated = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    const onAuthPath = AUTH_PATHS.includes(pathname);

    if (status === 'authenticated' && onAuthPath) {
      router.push('/');
      return;
    }

    if (status === 'unauthenticated' && !onAuthPath) {
      router.push('/login');
    }
  }, [status, pathname, router]);
};

export default useRedirectAuthenticated;
