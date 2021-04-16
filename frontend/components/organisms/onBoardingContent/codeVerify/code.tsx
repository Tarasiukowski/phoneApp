import { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RedirectTemplate from '../../../../templates/redirectTemplate/redirectTemplate';
import Alert from '../../../atoms/alert/alert';
import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';
import { selectUser } from '../../../../reducers/userReducer';
import { updateUser } from '../../../../utils/updateUser';
import { Error } from '../../../../interfaces';
import styles from './code.module.scss';

const OnboardingCodeContent = () => {
  const [valueInput, setValueInput] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const user = useSelector(selectUser);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setValueInput(value);
  };

  const verifyByCode = async (e: FormEvent) => {
    e.preventDefault();

    const { data } = await axios.post('http://localhost:7000/user/verifyByCode', {
      email: user.email,
      code: valueInput,
    });

    if (data.valid) {
      updateUser([{ email: user.email, redirectTo: "/onboarding/number" }])
      setRedirect(true);
      setError(null);
    } else {
      setError({ msg: data.errorMsg, id: Math.random() });
    }
  };

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo="/onboarding/number">
      <form onSubmit={verifyByCode} className={styles.template}>
        <img src="/pngs/verifyMail.png" width="200px" alt="verify mail" />
        <h2>Check your email</h2>
        <p>We just sent you a 6-digit code to {user.email}. Enter the code below to continue</p>
        <Input value={valueInput} onChange={handleOnChange} placeholder="6-digit code" />
        <Button disabled={valueInput.length < 1 ? true : false} type="submit">
          Continue
        </Button>
      </form>
      <Alert error={error ? error : null} />
    </RedirectTemplate>
  );
};

export default OnboardingCodeContent;
