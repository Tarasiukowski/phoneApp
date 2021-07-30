import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Input, Button } from 'components/atoms';

import { handleRequestError, auth } from 'utils';
import { login as authLogin } from 'setup/reducers/userReducer';
import { props, Fields } from './types';
import { useError } from 'contexts';
import { useMutation } from 'hooks';
import { AuthType } from 'interfaces';
import styles from './authForm.module.scss';
import { paths } from '../../../constants';

const AuthForm = ({ authType }: props) => {
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const { setError } = useError();
  const { mutate, status } = useMutation(auth);

  const isRegister = authType === AuthType.Singup;
  const redirectTo = isRegister ? paths.onBoarding.code : paths.login.verify;
  const valueEmailInput: string = watch('email');
  const disabled = !valueEmailInput?.length || status === 'loading';

  const submit = useCallback(async (fields: Fields) => {
    const { email } = fields;

    try {
      const { user } = await mutate(authType, {
        email,
        by: 'email',
      });

      setError(null);
      dispatch(authLogin(user));

      router.push(redirectTo);
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
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
