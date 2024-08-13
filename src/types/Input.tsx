import { HtmlHTMLAttributes, InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputname: string;
  defaultvalue?: string;
}
