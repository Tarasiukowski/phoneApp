import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import GoogleLogin from 'react-google-login';

import { ButtonGoogle, ToggleAuth } from '../../atoms';
import { AuthForm } from '../../molecules';
import { RedirectTemplate } from '../../../templates';

import { login as loginAuth } from '../../../reducers/userReducer';
import { fetcher } from '../../../utils';
import { ErrorContext } from '../../../contexts';
import styles from './authContent.module.scss';

const AuthContent = () => {
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();
  const { asPath } = useRouter();

  const { setError } = useContext(ErrorContext);

  const activePath = asPath.slice(1) as 'login' | 'singup';
  const redirectTo = activePath === 'login' ? '/contacts' : '/onboarding/number';

  const hanldeGoogleLogin = async (res: any) => {
    const {
      profileObj: { email, imageUrl },
    } = res;

    try {
      const { user } = await fetcher(
        'post',
        `/auth/${activePath === 'login' ? 'login' : 'singup'}`,
        {
          email,
          image: imageUrl,
          by: 'Google',
        },
      );

      setError(null);

      setRedirect(true);

      dispatch(loginAuth(user));
    } catch (err) {
      const { errorMsg } = err.response.data;

      setError({ msg: errorMsg, id: Math.random() });

      return;
    }
  };

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo={redirectTo}>
      <div className={styles.card}>
        <h4>{activePath === 'login' ? 'Log into OpenPhone' : 'Sign up on OpenPhone'}</h4>
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
