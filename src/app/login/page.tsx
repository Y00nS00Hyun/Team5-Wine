// pages/index.tsx
import React from 'react';
import Button from '../../components/Button';

const Home: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>Welcome to my Next.js app!</h1>
      <Button text="Click Me" onClick={handleClick} />
    </div>
  );
};

export default Home;
