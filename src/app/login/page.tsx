'use client';
import React from 'react';
import LoginForm from '@/components/loginform/loginform';
import '../globals.scss';
import './page.scss';
import { getSession, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

const Home = () => {
  const session = useSession();

  if (session?.data?.user) {
    redirect('/');
  }

  return (
    <div className="login-container">
      <LoginForm />
    </div>
  );
};

export default Home;
