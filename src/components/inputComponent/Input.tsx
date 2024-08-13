'use client';

import React from 'react';
import '@/components/inputComponent/Input.scss';
import { InputProps } from '@/types/Input';

const Input: React.FC<InputProps> = ({ placeholder = '입력하시오.', inputname = '입력하시오.', defaultValue = '', ...rest }) => {
  return (
    <div className="form">
      {inputname && <p className="inputname">{inputname}</p>}
      <input className="input" placeholder={placeholder} defaultValue={defaultValue} {...rest} />
    </div>
  );
};

export default Input;
