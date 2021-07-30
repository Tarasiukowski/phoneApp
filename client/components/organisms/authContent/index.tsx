import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import GoogleLogin from 'react-google-login';

import { ButtonGoogle, ToggleAuth } from 'components/atoms';
import { AuthForm } from 'components/molecules';

import { AuthType } from 'interfaces';
import { useMutation } from 'hooks';
import { login as loginAuth } from 'setup/reducers/userReducer';
import { auth, handleRequestError } from 'utils';
import { useError } from 'contexts';
import { paths } from '../../../constants';
import styles from './authContent.module.scss';

const AuthContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { setError } = useError();
  const { mutate, status } = useMutation(auth);

  const activePath = router.asPath.slice(1) as AuthType;
  const isRegister = activePath === AuthType.Singup;
  const redirectTo = isRegister ? paths.onBoarding.number : paths.contacts;
  const title = isRegister ? 'Sign up on OpenPhone' : 'Log into OpenPhone';
  const disabled = status === 'loading';

  const hanldeGoogleLogin = useCallback(async (res: any) => {
    const {
      profileObj: { email, imageUrl },
    } = res;

    try {
      const { user } = await mutate(isRegister ? AuthType.Singup : AuthType.Login, {
        email,
        image: imageUrl,
        by: 'google',
      });

      setError(null);
      dispatch(loginAuth(user));

      router.push(redirectTo);
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  }, []);

  return (
    <div className={styles.card}>
      <h4>{title}</h4>
      <h6>Use one of the methods below to continue</h6>
      <GoogleLogin
        clientId={`${process.env.NEXT_PUBLIC_CLIENT_ID}`}
        onSuccess={hanldeGoogleLogin}
        render={({ onClick }) => (
          <ButtonGoogle onClick={onClick} auth={activePath} disabled={disabled} />
        )}
      />
      <p>Or continue with email</p>
      <AuthForm authType={activePath} />
      <ToggleAuth authType={activePath} />
    </div>
  );
};

export { AuthContent };
