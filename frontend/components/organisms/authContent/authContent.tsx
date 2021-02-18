import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonGoogle from '../../atoms/buttonGoogle/buttonGoogle';
import AuthForm from '../../molecules/authForm/authForm';
import ToggleAuth from '../../atoms/toggleAauth/toggleAuth';
import Alert from '../../atoms/alert/alert';
import styles from './authContent.module.scss';
import GoogleLogin from 'react-google-login';
import { responseGoogle } from '../../../utils/responseGoogle';
import { propsAuthContent } from '../../../interfaces';


const AuthContent = ({ login }: propsAuthContent) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const googleLogin = responseGoogle(setErrorMessage, dispatch, login);

  const closeAlert = () => {
    setErrorMessage(null);
  };

  return (
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
  );
};

export default AuthContent;
