import { Dispatch, SetStateAction } from 'react';
import { login as loginAuth } from '../reducers/userReducer';
import { fetcher } from './fetcher';

export const responseGoogle = (
  setErrorMessage: Dispatch<SetStateAction<string | null>>,
  dispatch: Dispatch<any>,
  login: Boolean | undefined,
) => {
  return async (res: any) => {
    const {
      profileObj: { email },
    } = res;

    const { user, errorMsg } = await fetcher('post', login ? 'login' : 'singup', {
      email,
    });

    if (errorMsg) {
      setErrorMessage(errorMsg);
      return;
    } else {
      setErrorMessage(null);
    }

    dispatch(loginAuth(user));
  };
};
