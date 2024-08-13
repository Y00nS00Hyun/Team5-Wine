'use client';

import './loginform.scss';
import React, { useState } from 'react';
import { signInAPI } from '@/api/Auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Input from '@/components/inputComponent/Input';
import Button from '@/components/button/Button';
import OAuthButton from '../oauthbuttoncomponent/OAuthButton';
import Logo from '@/assets/icon/wineLogo.svg';
import googleLogo from '@/assets/icon/googleLogo.svg';
import kakaoLogo from '@/assets/icon/kakaoLogo.svg';
import { signInRequestBody, signResponse } from '@/types/AuthProps';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('gwangho@gwangho.com');
  const [password, setPassword] = useState('12345678');

  const handleSignIn = () => {
    console.log(email, password);
    // TODO: validation 코드 추가

    signIn('Credentials', { email: encodeURIComponent(email), password });

    // try {
    //   e.preventDefault();
    //   const user: signInRequestBody = { email, password };
    //   const response = await signInAPI(user);
    //   // onLoginSuccess(response.user.image.url, response.accessToken, response.refreshToken); // 로그인 성공 시 이미지 및 토큰 전달
    //   localStorage.setItem('accessToken', response.accessToken);
    //   localStorage.setItem('refreshToken', response.refreshToken);
    //   localStorage.setItem('User', JSON.stringify(response.user));
    //   // localStorage.removeItem('accessToken');
    //   // localStorage.removeItem('refreshToken');
    //   // localStorage.removeItem('User');
    //   router.push('/');
    //   console.log(response.user);
    // } catch (error) {
    //   console.error('Error');
    // }
  };

  return (
    <div className="signin-form-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleSignIn();
        }}
      >
        <div className="signin-header">
          <Link href="/">
            <Image src={Logo} alt="wine" width={104} height={30} />
          </Link>
        </div>
        <Input type="email" placeholder="이메일 입력" inputname="이메일" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="비밀번호 입력" inputname="비밀번호" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
        <p className="fake-pw-finder">비밀번호를 잊으셨나요?</p>
        <Button text="로그인" type="submit" />
      </form>
      <OAuthButton logo={googleLogo} text="google로 시작하기" onClick={() => signIn('google')} />
      <OAuthButton logo={kakaoLogo} text="Kakao로 시작하기" onClick={() => signIn('kakao')} />

      <p className="signup-link">
        {/* TODO:  */}
        계정이 없으신가요? <Link href="/SignUp">회원가입하기</Link>
      </p>
    </div>
  );
};

export default LoginForm;
