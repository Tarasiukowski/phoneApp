import { AuthType } from 'interfaces';
import { ButtonHTMLAttributes } from 'react';

export type props = {
  auth: AuthType;
} & ButtonHTMLAttributes<HTMLButtonElement>;
