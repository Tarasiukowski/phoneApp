import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import GoogleLogin from 'react-google-login';

import ButtonGoogle from '../../atoms/buttonGoogle/buttonGoogle';
import AuthForm from '../../molecules/authForm/authForm';
import ToggleAuth from '../../atoms/toggleAauth/toggleAuth';
import Alert from '../../atoms/alert/alert';
import RedirectTemplate from '../../../templates/redirectTemplate/redirectTemplate';

import { login as loginAuth } from '../../../reducers/userReducer';
import { fetcher } from '../../../utils';
import { Error } from '../../../interfaces';
import styles from './authContent.module.scss';

const AuthContent = () => {
  const [error, setError] = useState<Error | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { asPath } = useRouter();

  const activePath: any = asPath.slice(1);

  const hanldeGoogleLogin = async (res: any) => {
    const {
      profileObj: { email, imageUrl },
    } = res;

    const { user, errorMsg } = await fetcher(
      'post',
      `auth/${activePath === 'login' ? 'login' : 'singup'}`,
      {
        email,
        image: imageUrl,
        by: 'Google',
      },
    );

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
    <RedirectTemplate
      isRedirect={redirect}
      redirectTo={activePath === 'login' ? '/contacts' : '/onboarding/number'}
    >
      <div className={styles.card}>
        <h4>{activePath === 'login' ? 'Log into OpenPhone' : 'Sign up on OpenPhone'}</h4>
        <h6>Use one of the methods below to continue</h6>
        <GoogleLogin
          clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
          onSuccess={hanldeGoogleLogin}
          render={({ onClick }) => <ButtonGoogle onClick={onClick} auth={activePath} />}
        />
        <p>Or continue with email</p>
        <AuthForm auth={activePath} setError={setError} />
        <ToggleAuth auth={activePath} />
        <Alert error={error} />
      </div>
    </RedirectTemplate>
  );
};

export default AuthContent;
