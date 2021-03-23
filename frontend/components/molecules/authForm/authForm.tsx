import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input } from '../../atoms/input/input';
import { Button } from '../../atoms/button/button';
import Loader from '../loader/loader';
import { login as authLogin } from '../../../reducers/userReducer';
import { propsAuthForm, formData } from '../../../interfaces';
import styles from './authForm.module.scss';

const AuthForm = ({ login, setErrorMessage }: propsAuthForm) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);

  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setDisabled(!watch('email') ? true : false);
  }, [watch('email')]);

  const submit = async (data: formData) => {
    const { email } = data;

    setDisabled(true);

    dispatch(authLogin('loading'));

    const {
      data: { errorMsg, user },
    } = await axios.post(
      `http://localhost:7000/auth/${login ? 'login' : 'singup'}`,
      {
        email,
        by: 'Google',
      },
      { withCredentials: true },
    );

    if (errorMsg) {
      setErrorMessage(errorMsg);
      setDisabled(false);

      dispatch(authLogin(null));
      return;
    }

    setErrorMessage(null);
    setDisabled(false);
    setRedirect(true);

    dispatch(authLogin(user));

    router.push('/onboarding/code');
  };

  if (redirect) {
    return <Loader />;
  } else {
    return (
      <>
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <Input name="email" placeholder="Enter your email" autoComplete="off" ref={register()} />
          <Button type="submit" disabled={disabled}>
            Continue
          </Button>
        </form>
      </>
    );
  }
};

export default AuthForm;
