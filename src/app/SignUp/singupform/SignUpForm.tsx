'use client';

import Image from 'next/image';
import wineLogo from '@/assets/icon/wineLogo.svg';
import Input from '@/components/inputComponent/Input';
import Button from '@/components/button/Button';
import { signUpAPI, signInAPI } from '@/api/Auth';
import { loginAndStoreTokens } from '@/utils/authutils';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import './SignUpForm.scss';
import { getSession, signIn, useSession } from 'next-auth/react';
export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const session = useSession();

  const validateEmail = (value: string) => {
    if (!value) return '이메일은 필수 입력입니다.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return '이메일 형식으로 작성해 주세요.';
    return '';
  };

  const validateNickname = (value: string) => {
    if (!value) return '닉네임은 필수 입력입니다.';
    if (value.length > 20) return '닉네임은 최대 20자까지 가능합니다.';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return '비밀번호는 필수 입력입니다.';
    if (value.length < 8) return '비밀번호는 최소 8자 이상입니다.';
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]*$/;
    if (!passwordRegex.test(value)) return '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.';
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return '비밀번호 확인을 입력해주세요.';
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const errorMessage = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: errorMessage }));
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    const errorMessage = validateNickname(value);
    setErrors((prev) => ({ ...prev, nickname: errorMessage }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const errorMessage = validatePassword(value);
    setErrors((prev) => ({ ...prev, password: errorMessage }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setPasswordConfirmation(value);
    const errorMessage = validateConfirmPassword(value);
    setErrors((prev) => ({ ...prev, passwordConfirmation: errorMessage }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error);
    if (!hasErrors) {
      try {
        const userData = {
          email: email,
          nickname: nickname,
          password: password,
          passwordConfirmation: passwordConfirmation,
        };
        console.log('전송할 데이터:', userData);

        await signUpAPI(userData);
        alert('회원가입이 완료되었습니다');

        signIn('Credentials', { email: encodeURIComponent(email), password });

        const session2 = await getSession();
        console.log(session2);

        if (session2?.user.user) {
          redirect('/');
        }
      } catch (error) {
        console.error('회원가입 중 오류가 발생했습니다:', error);
      }
    } else {
      alert('입력값을 다시 확인해주세요');
    }
  };

  return (
    <div className="signup-form-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-header">
          <Image src={wineLogo} alt="와인 로고" width={104} height={30} />
        </div>
        <Input type="email" placeholder="whyne@email.com" inputname="이메일" defaultValue={email} onBlur={(e) => handleEmailChange(e.target.value)} />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <Input type="text" placeholder="whyne" inputname="닉네임" defaultValue={nickname} onBlur={(e) => handleNicknameChange(e.target.value)} />
        {errors.nickname && <p className="error-message">{errors.nickname}</p>}
        <Input type="password" placeholder="비밀번호" inputname="비밀번호" defaultValue={password} onBlur={(e) => handlePasswordChange(e.target.value)} />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <Input type="password" placeholder="비밀번호 확인" inputname="비밀번호 확인" defaultValue={passwordConfirmation} onBlur={(e) => handleConfirmPasswordChange(e.target.value)} />
        {errors.passwordConfirmation && <p className="error-message">{errors.passwordConfirmation}</p>}
        <Button text="가입하기" type="submit" />
      </form>
      <p className="login-link">
        계정이 이미 있으신가요? <Link href="/login">로그인하기</Link>
      </p>
    </div>
  );
}
