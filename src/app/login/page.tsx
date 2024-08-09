'use client';

import React from 'react';
import Button from '@/components/button/Button';
import GNB from '@/components/gnb/GNB';
import LoginForm from '@/components/loginform/loginform';

const Home: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  const {} = useMutation();

  return (
    <div style={{ width: 400 }}>
      <GNB />
      <Button text="가입하기" onClick={handleClick} style={{ width: '100%' }} />
    </div>
  );
};

export default Home;
