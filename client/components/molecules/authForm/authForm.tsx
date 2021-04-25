import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input } from '../../atoms/input/input';
import { Button } from '../../atoms/button/button';
import RedirectTemplate from '../../../templates/redirectTemplate/redirectTemplate';
import { login as authLogin } from '../../../reducers/userReducer';
import { propsAuthForm, formData } from '../../../interfaces';
import styles from './authForm.module.scss';

const AuthForm = ({ login, setError }: propsAuthForm) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<boolean>(false);

  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    setDisabled(!watch('email') ? true : false);
  }, [watch('email')]);

  const submit = async (data: formData) => {
    const { email } = data;

    setDisabled(true);

    const {
      data: { errorMsg, user },
    } = await axios.post(
      `http://localhost:7000/auth/${login ? 'login' : 'singup'}`,
      {
        email,
      },
      { withCredentials: true },
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
    <RedirectTemplate
      isRedirect={redirect}
      redirectTo={login ? '/onboarding/code' : '/onboarding/number'}
    >
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <Input name="email" placeholder="Enter your email" autoComplete="off" ref={register()} />
        <Button type="submit" disabled={disabled}>
          Continue
        </Button>
      </form>
    </RedirectTemplate>
  );
};

export default AuthForm;
