'use client';

import './loginform.scss';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Input from '@/components/inputcomponent/Input';
import Button from '@/components/button/Button';
import OAuthButton from '../oauthbuttoncomponent/OAuthButton';
import Logo from '@/assets/icon/wineLogo.svg';
import googleLogo from '@/assets/icon/googleLogo.svg';
import kakaoLogo from '@/assets/icon/kakaoLogo.svg';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!EMAIL_REGEX.test(email)) {
      setError('이메일 형식으로 작성해 주세요.');
      return;
    }
    if (password.length < 8) {
      setError('비밀번호는 최소 8자 이상입니다.');
      return;
    }
    setError('');

    const res = await signIn('Credentials', {
      email: encodeURIComponent(email),
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } else if (res?.ok) {
      window.location.assign('/');
    }
  };

  return (
    <div className="signin-form-container">
      <div className="signin-form">
        <div className="signin-header">
          <Link href="/">
            <Image src={Logo} alt="wine" width={104} height={30} />
          </Link>
        </div>
        <Input
          type="email"
          placeholder="이메일 입력"
          inputname="이메일"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 입력"
          inputname="비밀번호"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <p className="fake-pw-finder">비밀번호를 잊으셨나요?</p>
        <Button text="로그인" onClick={handleSignIn} />
      </div>
      <OAuthButton logo={googleLogo} text="google로 시작하기" onClick={() => signIn('google')} />
      <OAuthButton logo={kakaoLogo} text="Kakao로 시작하기" onClick={() => signIn('kakao')} />

      <p className="signup-link">
        계정이 없으신가요? <Link href="/signup">회원가입하기</Link>
      </p>
    </div>
  );
};

export default LoginForm;
