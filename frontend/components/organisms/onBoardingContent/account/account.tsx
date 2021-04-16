import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../reducers/userReducer';
import RedirectTemplate from '../../../../templates/redirectTemplate/redirectTemplate';
import Alert from '../../../atoms/alert/alert';
import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';
import { updateUser } from '../../../../utils/updateUser';
import { Error } from '../../../../interfaces';
import styles from './account.module.scss';

const OnboardingAccountContent = () => {
  const [valueFirstName, setValueFirstName] = useState<string>('');
  const [valueLastName, setValueLastName] = useState<string>('');
  const [disabledByRequest, setDisabledByRequest] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
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

  const next = () => {
    setDisabledByRequest(true);

    try {
      axios
        .post('http://localhost:7000/user/update', {
          email: user.email,
          firstName: valueFirstName,
          lastName: valueLastName,
        })
        .then(() => {
          updateUser([{ email: user.email, redirectTo: '/' }]);
          setRedirect(true);
        });
    } catch (e) {
      setError({ msg: "'Can not set firstname and lastname'", id: Math.random() });
    }

    setDisabledByRequest(false);
  };

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo="/">
      <form onSubmit={next} className={styles.template}>
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
        <Button type="submit" disabled={disabledByRequest ? disabledByRequest : disabledByValue}>
          Continue
        </Button>
      </form>
      <Alert error={error ? error : null} />
    </RedirectTemplate>
  );
};

export default OnboardingAccountContent;
