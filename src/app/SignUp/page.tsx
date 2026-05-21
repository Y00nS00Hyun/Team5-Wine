'use client';

import SignupForm from './singupform/SignUpForm';
import '../globals.scss';
import './page.scss';

export default function SignUp() {
  return (
    <div className="signup-form">
      <SignupForm />
    </div>
  );
}
