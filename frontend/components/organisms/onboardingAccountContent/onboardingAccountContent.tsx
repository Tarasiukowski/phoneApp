import { ChangeEvent, useState } from 'react';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import styles from './onboardingAccountContent.module.scss';

const OnboardingAccountContent = () => {
  const [valueFirstName, setValueFirstName] = useState<string>('');
  const [valueLastName, setValueLastName] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const value = target.value

    if(target.name === "firstname"){
      setValueFirstName(value)
    } else if(target.name === "lastname") {
      setValueLastName(value)
    }
  };

  return (
    <div className={styles.template}>
      <h2>A little about you</h2>
      <p>This is your OpenPhone profile</p>
      <div className={styles.templateInputs}>
        <Input
          name="firstname"
          value={valueFirstName}
          onChange={onChange}
          placeholder="First name"
        />
        <Input name="lastname" value={valueLastName} onChange={onChange} placeholder="Last name" />
      </div>
      <Button>Continue</Button>
    </div>
  );
};

export default OnboardingAccountContent;
