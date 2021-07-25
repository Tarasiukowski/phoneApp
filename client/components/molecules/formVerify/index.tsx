import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';

import { Button, Input } from 'components/atoms';

import { fetcher, handleRequestError } from 'utils';
import { useError } from 'contexts';
import { useUser } from 'setup/reducers/userReducer';
import { props, TypeVerify } from './types';
import styles from './formVerify.module.scss';
import { useLoading } from 'contexts';

const imageStyle = {
  width: '200px',
  height: '200px',
};

const FormVerify = ({ type, onSuccess }: props) => {
  const [valueInput, setValueInput] = useState('');

  const user = useUser();
  const { setError } = useError();
  const { toggleLoading } = useLoading();

  const isVerifyAccount = type === TypeVerify.account;
  const buttonDisabled = valueInput.length < 1;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await fetcher('post', `/user/verify/${isVerifyAccount ? 'account' : 'login'}`, {
        code: valueInput,
      });
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
      return;
    }

    toggleLoading(true);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Image src="/pngs/verifyMail.png" alt="verify mail" {...imageStyle} />
      <h2>Check your email</h2>
      <p>We just sent you a 6-digit code to {user?.email}. Enter the code below to continue</p>
      <Input
        value={valueInput}
        onChange={handleOnChange}
        placeholder="6-digit code"
        autoComplete="off"
      />
      <Button disabled={buttonDisabled} type="submit">
        Continue
      </Button>
    </form>
  );
};

export { FormVerify };
