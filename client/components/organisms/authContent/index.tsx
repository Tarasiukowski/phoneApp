import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import GoogleLogin from 'react-google-login';

import { ButtonGoogle, ToggleAuth } from 'components/atoms';
import { AuthForm } from 'components/molecules';
import { RedirectTemplate } from 'templates';

import { AuthType } from 'interfaces';
import { login as loginAuth } from 'setup/reducers/userReducer';
import { fetcher, handleRequestError } from 'utils';
import { useError } from 'contexts';
import styles from './authContent.module.scss';

const AuthContent = () => {
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();
  const { asPath } = useRouter();

  const { setError } = useError();

  const activePath = asPath.slice(1) as AuthType;
  const isRegister = activePath === 'singup';
  const redirectTo = isRegister ? '/onboarding/number' : '/contacts';

  const hanldeGoogleLogin = async (res: any) => {
    const {
      profileObj: { email, imageUrl },
    } = res;

    try {
      const { user } = await fetcher('post', `/auth/${isRegister ? 'singup' : 'login'}`, {
        email,
        image: imageUrl,
        by: 'Google',
      });

      setError(null);

      setRedirect(true);

      dispatch(loginAuth(user));
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });

      return;
    }
  };

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo={redirectTo}>
      <div className={styles.card}>
        <h4>{isRegister ? 'Sign up on OpenPhone' : 'Log into OpenPhone'}</h4>
        <h6>Use one of the methods below to continue</h6>
        <GoogleLogin
          clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
          onSuccess={hanldeGoogleLogin}
          render={({ onClick }) => <ButtonGoogle onClick={onClick} auth={activePath} />}
        />
        <p>Or continue with email</p>
        <AuthForm auth={activePath} />
        <ToggleAuth auth={activePath} />
      </div>
    </RedirectTemplate>
  );
};

export { AuthContent };
