import { Dispatch, SetStateAction } from 'react';
import { Error } from '../../../interfaces'

export type props = {
  login?: boolean;
  setError: Dispatch<SetStateAction<Error | null>>;
};
