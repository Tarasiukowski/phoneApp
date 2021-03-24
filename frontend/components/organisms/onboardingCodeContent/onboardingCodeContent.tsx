import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../reducers/userReducer';
import Alert from '../../atoms/alert/alert';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import Loader from '../../molecules/loader/loader';
import styles from './onboardingCodeContent.module.scss';

const OnboardingCodeContent = () => {
  const [valueInput, setValueInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const user = useSelector(selectUser);
  const router = useRouter();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setValueInput(value);
  };

  const verifyByCode = async () => {
    const { data } = await axios.post('http://localhost:7000/user/verifyByCode', {
      email: user.email,
      code: valueInput,
    });

    if (data.valid) {
      setLoading(true);
      console.log(loading);
      setErrorMsg(null);
    } else {
      setErrorMsg(data.errorMsg);
    }
  };

  if (loading) {
    router.push('/onboarding/number');
    return <Loader />;
  }

  return (
    <>
      <div className={styles.template}>
        <h2>Check your email</h2>
        <p>We just sent you a 6-digit code to {user.email}. Enter the code below to continue</p>
        <Input value={valueInput} onChange={handleOnChange} placeholder="6-digit code" />
        <Button onClick={verifyByCode} disabled={valueInput.length < 1 ? true : false}>
          Continue
        </Button>
      </div>
      {errorMsg && <Alert errorMessage={errorMsg} close={() => setErrorMsg(null)} />}
    </>
  );
};

export default OnboardingCodeContent;
