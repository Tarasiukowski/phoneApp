import { Dispatch, SetStateAction } from 'react';
import { Error } from '../../../interfaces';

export type props = {
  auth: 'login' | 'singup';
  setError: Dispatch<SetStateAction<Error | null>>;
};

export type formData = {
  email: String;
};
