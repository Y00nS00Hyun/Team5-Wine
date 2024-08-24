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

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (value: string) => {
    if (!value) return '이메일은 필수 입력입니다.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '이메일 형식으로 작성해 주세요.';
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const errorMessage = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: errorMessage }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const errorMessage = validatePassword(value);
    setErrors((prev) => ({ ...prev, password: errorMessage }));
  };

  const validatePassword = (value: string) => {
    if (!value) return '비밀번호는 필수 입력입니다.';
    if (value.length < 8) return '비밀번호는 최소 8자 이상입니다.';
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]*$/;
    if (!passwordRegex.test(value)) return '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.';
    return '';
  };

  const handleSignIn = () => {
    console.log(email, password);
    // TODO: validation 코드 추가

    signIn('Credentials', { email: encodeURIComponent(email), password });
  };

  return (
    <div className="signin-form-container">
      <div className="signin-form">
        <div className="signin-header">
          <Link href="/">
            <Image src={Logo} alt="wine" width={104} height={30} />
          </Link>
        </div>
        <Input type="email" placeholder="이메일 입력" inputname="이메일" defaultValue={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => handleEmailChange(e.target.value)} />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <Input type="password" placeholder="비밀번호 입력" inputname="비밀번호" defaultValue={password} onChange={(e) => setPassword(e.target.value)} onBlur={(e) => handlePasswordChange(e.target.value)} />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <p className="fake-pw-finder">비밀번호를 잊으셨나요?</p>
        <Button
          text="로그인"
          onClick={() => {
            handleSignIn();
          }}
        />
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
