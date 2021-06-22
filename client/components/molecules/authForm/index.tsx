import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Input, Button } from '../../atoms';
import { RedirectTemplate } from '../../../templates';

import { fetcher, handleNotAllowedError } from '../../../utils';
import { login as authLogin } from '../../../reducers/userReducer';
import { props, formData } from './types';
import { User } from '../../../interfaces';
import { ErrorContext } from '../../../contexts';
import styles from './authForm.module.scss';

const AuthForm = ({ auth }: props) => {
  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();

  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    setDisabled(watch('email') ? false : true);
  }, [watch('email')]);

  const submit = async (data: formData) => {
    const { email } = data;

    setDisabled(true);

    try {
      const { user } = (await fetcher('post', `/auth/${auth === 'login' ? 'login' : 'singup'}`, {
        email,
      })) as { errorMsg?: string; user: User };

      setError(null);
      setRedirect(true);
      dispatch(authLogin(user));
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
    }

    setDisabled(false);
  };

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo="/onboarding/code">
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <Input name="email" placeholder="Enter your email" autoComplete="off" ref={register()} />
        <Button type="submit" disabled={disabled}>
          Continue
        </Button>
      </form>
    </RedirectTemplate>
  );
};

export { AuthForm };
