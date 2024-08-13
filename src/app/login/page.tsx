'use client';

import React from 'react';
import LoginForm from '@/components/loginform/loginform';
import '../globals.scss';
import './page.scss';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Home: React.FC = () => {
  const session = useSession();
  if (session.data?.user.user) {
    redirect('/');
  }

  return (
    <div className="login-container">
      <LoginForm />
    </div>
  );
};

export default Home;
