'use client';

import Image from 'next/image';
import wineLogo from '@/assets/icon/wineLogo.svg';
import Input from '@/components/inputcomponent/Input';
import Button from '@/components/button/Button';
import { signUpAPI } from '@/api/Auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import './SignUpForm.scss';
import { getSession, signIn } from 'next-auth/react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9!@#$%^&*]*$/;

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (value: string) => {
    if (!value) return '이메일은 필수 입력입니다.';
    if (!EMAIL_REGEX.test(value)) return '이메일 형식으로 작성해 주세요.';
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
    if (!PASSWORD_REGEX.test(value)) return '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.';
    return '';
  };

  const validateConfirmPassword = (value: string) => {
    if (!value) return '비밀번호 확인을 입력해주세요.';
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setErrors((prev) => ({ ...prev, nickname: validateNickname(value) }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setPasswordConfirmation(value);
    setErrors((prev) => ({ ...prev, passwordConfirmation: validateConfirmPassword(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors = {
      email: validateEmail(email),
      nickname: validateNickname(nickname),
      password: validatePassword(password),
      passwordConfirmation: validateConfirmPassword(passwordConfirmation),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      alert('입력값을 다시 확인해주세요');
      return;
    }

    try {
      const response = await signUpAPI({ email, nickname, password, passwordConfirmation });

      if (response?.status === 400) {
        alert('중복된 이메일입니다.');
        return;
      }

      alert('회원가입이 완료되었습니다');

      const signInResponse = await signIn('Credentials', {
        email: encodeURIComponent(email),
        password,
        redirect: false,
      });

      if (signInResponse?.error) {
        alert('로그인 중 오류가 발생했습니다.');
        return;
      }

      const session = await getSession();
      if (session?.user.user) {
        router.push('/');
      }
    } catch (error) {
      console.error('회원가입 중 오류가 발생했습니다:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
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
