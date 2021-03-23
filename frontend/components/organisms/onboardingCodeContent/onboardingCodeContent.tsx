import { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../reducers/userReducer';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import styles from './onboardingCodeContent.module.scss';

const OnboardingCodeContent = () => {
  const [valueInput, setValueInput] = useState<string>('');

  const user = useSelector(selectUser);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setValueInput(value);
  };

  return (
    <div className={styles.template}>
      <h2>Check your email</h2>
      <p>We just sent you a 6-digit code to {user.email}. Enter the code below to continue</p>
      <Input value={valueInput} onChange={handleOnChange} placeholder="6-digit code" />
      <Button disabled={valueInput.length < 1 ? true : false}>Continue</Button>
    </div>
  );
};

export default OnboardingCodeContent;
