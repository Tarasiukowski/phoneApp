import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ButtonGoogle from '../../atoms/buttonGoogle/buttonGoogle';
import AuthForm from '../../molecules/authForm/authForm';
import ToggleAuth from '../../atoms/toggleAauth/toggleAuth';
import Alert from '../../atoms/alert/alert';
import styles from './authContent.module.scss';
import GoogleLogin from 'react-google-login';
import { login as loginAuth } from '../../../reducers/userReducer';
import { propsAuthContent } from '../../../interfaces';
import RedirectTemplate from '../../../templates/redirectTemplate/redirectTemplate';

const AuthContent = ({ login }: propsAuthContent) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const dispatch = useDispatch();

  const googleLogin = async (res: any) => {
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

    setRedirect(true);

    dispatch(loginAuth(user));
  };

  const closeAlert = () => {
    setErrorMessage(null);
  };

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo="/onboarding/number">
      <div className={styles.card}>
        <h4>{login ? 'Log into OpenPhone' : 'Sign up on OpenPhone'}</h4>
        <h6>Use one of the methods below to continue</h6>
        <GoogleLogin
          clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
          onSuccess={googleLogin}
          render={({ onClick }) => <ButtonGoogle onClick={onClick} login={login} />}
        />
        <p>Or continue with email</p>
        <AuthForm login={login} setErrorMessage={setErrorMessage} />
        <ToggleAuth login={login} />
        {errorMessage && <Alert close={closeAlert} errorMessage={errorMessage} />}
      </div>
    </RedirectTemplate>
  );
};

export default AuthContent;
