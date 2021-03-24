import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { login as loginAuth } from '../reducers/userReducer';

export const responseGoogle = (
  setErrorMessage: Dispatch<SetStateAction<string | null>>,
  dispatch: Dispatch<any>,
  login: Boolean | undefined,
) => {
  return async (res: any) => {
    const {
      profileObj: { email },
    } = res;

    const {
      data: { user, errorMsg },
    } = await axios.post(
      `http://localhost:7000/auth/${login ? 'login' : 'singup'}`,
      {
        email,
      },
      { withCredentials: true },
    );

    if (errorMsg) {
      setErrorMessage(errorMsg);
      return;
    } else {
      setErrorMessage(null);
    }

    dispatch(loginAuth(user));
  };
};
