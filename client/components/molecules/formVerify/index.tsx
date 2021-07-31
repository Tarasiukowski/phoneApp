import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import Image from 'next/image';

import { Button, Input } from 'components/atoms';

import { verifyUser, handleRequestError } from 'utils';
import { useError } from 'contexts';
import { useMutation } from 'hooks';
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
  const { mutate, status } = useMutation(verifyUser);

  const isVerifyAccount = type === TypeVerify.account;
  const disabled = !valueInput.length || status === 'loading';

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValueInput(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await mutate(isVerifyAccount ? 'account' : 'login', valueInput);

      toggleLoading(true);
      onSuccess();
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
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
      <Button disabled={disabled} type="submit">
        Continue
      </Button>
    </form>
  );
};

export { FormVerify };
