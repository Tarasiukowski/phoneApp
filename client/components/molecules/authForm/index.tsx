import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Input, Button } from 'components/atoms';

import { fetcher, handleRequestError } from 'utils';
import { login as authLogin } from 'setup/reducers/userReducer';
import { props, formData } from './types';
import { useError } from 'contexts';
import { AuthType } from 'interfaces';
import styles from './authForm.module.scss';
import { paths } from '../../../constants';

const AuthForm = ({ auth }: props) => {
  const [disabled, setDisabled] = useState(true);

  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const { setError } = useError();

  const isRegister = auth === AuthType.Singup;
  const redirectTo = isRegister ? paths.onBoarding.code : paths.login.verify;
  const valueEmailInput = watch('email');

  useEffect(() => {
    setDisabled(valueEmailInput ? false : true);
  }, [valueEmailInput]);

  const submit = useCallback(async (data: formData) => {
    const { email } = data;

    setDisabled(true);

    try {
      const { user } = await fetcher(
        'post',
        `/auth${isRegister ? paths.singUp : paths.login.index}`,
        {
          email,
          authType: 'email',
        },
      );

      setError(null);
      router.push(redirectTo);
      dispatch(authLogin(user));
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    } finally {
      setDisabled(false);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      <Input name="email" placeholder="Enter your email" autoComplete="off" ref={register()} />
      <Button type="submit" disabled={disabled}>
        Continue
      </Button>
    </form>
  );
};

export { AuthForm };
