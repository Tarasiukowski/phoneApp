import { useState, FormEvent, ChangeEvent } from 'react';

import { Button, Input } from 'components/atoms';

import { fetcher, handleRequestError } from 'utils';
import { useError } from 'contexts';
import { useUser } from 'hooks';
import { props } from './types';
import styles from './formVerify.module.scss';

const FormVerify = ({ type, onSuccess }: props) => {
  const [valueInput, setValueInput] = useState('');

  const user = useUser();
  const { setError } = useError();

  const isVerifyAccount = type === 'account';

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const verifyByCode = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { valid } = await fetcher(
        'post',
        `/user/verify/${isVerifyAccount ? 'account' : 'login'}`,
        {
          code: valueInput,
        },
      );

      if (valid && isVerifyAccount) {
        try {
          fetcher('PUT', '/user/update', {
            redirectTo: '/onboarding/number',
          });
        } catch (err) {
          handleRequestError(err, (errorMsg) => {
            setError({ msg: errorMsg, id: Math.random() });
          });

          return;
        }
      }
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={verifyByCode} className={styles.form}>
      <img src="/pngs/verifyMail.png" width="200px" alt="verify mail" />
      <h2>Check your email</h2>
      <p>We just sent you a 6-digit code to {user?.email}. Enter the code below to continue</p>
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
  );
};

export { FormVerify };
