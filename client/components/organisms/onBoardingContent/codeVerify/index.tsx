import { useState, FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import { Button, Input } from '../../../atoms';
import { RedirectTemplate } from '../../../../templates';

import { selectUser } from '../../../../reducers/userReducer';
import { fetcher, handleNotAllowedError } from '../../../../utils';
import { useError } from '../../../../contexts';
import styles from './code.module.scss';

const OnboardingCodeContent = () => {
  const [valueInput, setValueInput] = useState('');
  const [redirect, setRedirect] = useState(false);

  const user = useSelector(selectUser);

  const { setError } = useError();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const verifyByCode = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { valid } = await fetcher('post', '/user/verify/account', {
        code: valueInput,
      });

      if (valid) {
        try {
          fetcher('PUT', '/user/update', {
            redirectTo: '/onboarding/number',
          });
        } catch (err) {
          const { data, status } = err.response;
          const { errorMsg } = data;

          setError({ msg: errorMsg, id: Math.random() });

          handleNotAllowedError(status);

          return;
        }
      }
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
      return;
    }

    setRedirect(true);
    setError(null);
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
    </RedirectTemplate>
  );
};

export { OnboardingCodeContent };
