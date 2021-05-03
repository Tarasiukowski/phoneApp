import { useState } from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import ButtonGoogle from '../../atoms/buttonGoogle/buttonGoogle';
import AuthForm from '../../molecules/authForm/authForm';
import ToggleAuth from '../../atoms/toggleAauth/toggleAuth';
import Alert from '../../atoms/alert/alert';
import { login as loginAuth } from '../../../reducers/userReducer';
import { fetcher } from '../../../utils';
import RedirectTemplate from '../../../templates/redirectTemplate/redirectTemplate';
import { Error, propsAuthContent } from '../../../interfaces';
import styles from './authContent.module.scss';

const AuthContent = ({ login }: propsAuthContent) => {
  const [error, setError] = useState<Error | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const dispatch = useDispatch();

  const googleLogin = async (res: any) => {
    const {
      profileObj: { email },
    } = res;

    const { user, errorMsg } = await fetcher('post', `auth/${login ? 'login' : 'singup'}`, {
      email,
      by: 'Google',
    });

    if (errorMsg) {
      setError({ msg: errorMsg, id: Math.random() });
      return;
    } else {
      setError(null);
    }

    setRedirect(true);

    dispatch(loginAuth(user));
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
        <AuthForm login={login} setError={setError} />
        <ToggleAuth login={login} />
        <Alert error={error ? error : null} />
      </div>
    </RedirectTemplate>
  );
};

export default AuthContent;
