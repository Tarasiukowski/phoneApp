import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../reducers/userReducer';
import Alert from '../../atoms/alert/alert';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';
import Loader from '../../molecules/loader/loader';
import styles from './onboardingAccountContent.module.scss';

const OnboardingAccountContent = () => {
  const [valueFirstName, setValueFirstName] = useState<string>('');
  const [valueLastName, setValueLastName] = useState<string>('');
  const [disabledByRequest, setDisabledByRequest] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const user = useSelector(selectUser);

  const disabledByValue = !valueFirstName.length || !valueLastName.length;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    if (target.name === 'firstname') {
      setValueFirstName(value);
    } else if (target.name === 'lastname') {
      setValueLastName(value);
    }
  };

  const updateUser = () => {
    setDisabledByRequest(true);

    try {
      axios.post('http://localhost:7000/user/update', {
        email: user.email,
        firstName: valueFirstName,
        lastName: valueLastName,
      });

      setRedirect(true);
    } catch (e) {
      setErrorMessage('Can not set ');
    }

    setDisabledByRequest(false);
  };

  const closeAlert = () => {
    setErrorMessage(null);
  };

  if (redirect) {
    return <Loader />;
  }

  return (
    <>
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
          <Input
            name="lastname"
            value={valueLastName}
            onChange={onChange}
            placeholder="Last name"
          />
        </div>
        <Button
          onClick={updateUser}
          disabled={disabledByRequest ? disabledByRequest : disabledByValue}
        >
          Continue
        </Button>
      </div>
      {errorMessage && <Alert close={closeAlert} errorMessage={errorMessage} />}
    </>
  );
};

export default OnboardingAccountContent;
