import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Input, Button } from '../../atoms';
import { RedirectTemplate } from '../../../templates';

import { fetcher } from '../../../utils';
import { login as authLogin } from '../../../reducers/userReducer';
import { props, formData } from './types';
import styles from './authForm.module.scss';

const AuthForm = ({ auth, setError }: props) => {
  const [disabled, setDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    setDisabled(watch('email') ? false : true);
  }, [watch('email')]);

  const submit = async (data: formData) => {
    const { email } = data;

    setDisabled(true);

    const { errorMsg, user } = await fetcher(
      'post',
      `/auth/${auth === 'login' ? 'login' : 'singup'}`,
      {
        email,
      },
    );

    if (errorMsg) {
      setError({ msg: errorMsg, id: Math.random() });
      setDisabled(false);
      return;
    }

    setError(null);
    setDisabled(false);
    setRedirect(true);

    dispatch(authLogin(user));
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
