import { useState, FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import RedirectTemplate from '../../../../templates/redirectTemplate/redirectTemplate';
import Alert from '../../../atoms/alert/alert';
import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';

import { selectUser } from '../../../../reducers/userReducer';
import { fetcher } from '../../../../utils';
import { Error } from '../../../../interfaces';
import styles from './code.module.scss';
import { ERROR_NOT_ALLOWED } from '../../../../common/errors';

export const OnboardingCodeContent = () => {
  const [valueInput, setValueInput] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const user = useSelector(selectUser);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const verifyByCode = async (e: FormEvent) => {
    e.preventDefault();

    const { valid, errorMsg, error } = await fetcher('post', '/user/verifyByCode', {
      email: user.email,
      code: valueInput,
    });

    if (error) {
      setError({ msg: errorMsg, id: Math.random() });

      if (errorMsg === ERROR_NOT_ALLOWED) {
        window.location.reload();
      }
      return;
    }

    if (valid) {
      const { error, errorMsg } = await fetcher('PUT', '/user/update', {
        email: user.email,
        redirectTo: '/onboarding/number',
      });

      if (error) {
        setError({ msg: errorMsg, id: Math.random() });
        window.location.reload();
        return;
      }

      setRedirect(true);
      setError(null);
    }
  };

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo="/onboarding/number">
      <form onSubmit={verifyByCode} className={styles.template}>
        <img src="/pngs/verifyMail.png" width="200px" alt="verify mail" />
        <h2>Check your email</h2>
        <p>We just sent you a 6-digit code to {user.email}. Enter the code below to continue</p>
        <Input
          value={valueInput}
          onChange={handleOnChange}
          placeholder="6-digit code"
          autoComplete="off"
        />
        <Button disabled={valueInput.length < 1 ? true : false} type="submit">
          Continue
        </Button>
      </form>
      <Alert error={error} />
    </RedirectTemplate>
  );
};
