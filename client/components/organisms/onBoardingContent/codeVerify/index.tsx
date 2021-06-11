import { useState, FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import { Alert, Button, Input } from '../../../atoms';
import { RedirectTemplate } from '../../../../templates';

import { selectUser } from '../../../../reducers/userReducer';
import { fetcher } from '../../../../utils';
import { Error } from '../../../../interfaces';
import { ERROR } from '../../../../common/errors';
import styles from './code.module.scss';

const OnboardingCodeContent = () => {
  const [valueInput, setValueInput] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [redirect, setRedirect] = useState(false);

  const user = useSelector(selectUser);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const verifyByCode = async (e: FormEvent) => {
    e.preventDefault();

    const { valid, errorMsg } = await fetcher('post', '/user/verify/account', {
      email: user.email,
      code: valueInput,
    });

    if (valid) {
      const { errorMsg } = await fetcher('PUT', '/user/update', {
        email: user.email,
        redirectTo: '/onboarding/number',
      });

      if (errorMsg) {
        setError({ msg: errorMsg, id: Math.random() });
        window.location.reload();
        return;
      }

      setRedirect(true);
      setError(null);
      return;
    }

    setError({ msg: errorMsg, id: Math.random() });

    if (errorMsg === ERROR.NOT_ALLOWED) {
      window.location.reload();
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

export { OnboardingCodeContent };
