import { useState } from 'react';
import { Input } from '../../atoms/input/input';
import { Button } from '../../atoms/button/button';
// import Alert from '../../atoms/alert/alert';
import { typeAuthForm } from '../../../interfaces';
import { handleOnChange } from '../../../utils';
import styles from './authForm.module.scss';

const AuthForm = ({ login }: typeAuthForm) => {
  const [emailValue, setEmailValue] = useState<string>('');

  return (
    <>
      <form className={styles.form}>
        <Input
            value={emailValue}
            onChange={(e) => handleOnChange(e, setEmailValue)}
            type="email"
            placeholder="Enter your email"
        />
        <Button type="submit" disabled={emailValue?.length < 1}>
            Continue
        </Button>
      </form>
      {/* <Alert /> */}
    </>
  );
};

export default AuthForm;
