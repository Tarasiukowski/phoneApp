import { ChangeEvent, FormEvent, useState, useReducer } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../../../reducers/userReducer';
import RedirectTemplate from '../../../../templates/redirectTemplate/redirectTemplate';
import Alert from '../../../atoms/alert/alert';
import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';

import { updateUser } from '../../../../utils';
import { fetcher } from '../../../../utils';
import { Error } from '../../../../interfaces';
import { FormValues } from './types';
import styles from './account.module.scss';

const OnboardingAccountContent = () => {
  const [formValues, setFormValues] = useReducer(
    (prevState: FormValues, state: FormValues) => ({ ...prevState, ...state }),
    { firstname: '', lastname: '' },
  );
  const [disabledByRequest, setDisabledByRequest] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const user = useSelector(selectUser);

  const { firstname, lastname } = formValues;

  const disabledByValue = firstname && lastname ? !firstname.length || !lastname.length : true;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setFormValues({
      [target.name]: value,
    });
  };

  const next = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDisabledByRequest(true);

    fetcher('put', 'user/update', {
      email: user.email,
      ...formValues,
    }).then(async (data) => {
      if (data.error) {
        setError({ msg: data.errorMsg, id: Math.random() });
        window.location.reload();
        return;
      }

      const returnData = await updateUser([
        { email: user.email, redirectTo: '/contacts', onBoarding: true },
      ]);

      if (returnData.error) {
        setError({ msg: returnData.errorMsg, id: Math.random() });
        window.location.reload();
        return;
      }

      setRedirect(true);
    });

    setDisabledByRequest(false);
  };

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo="/contacts">
      <form onSubmit={next} className={styles.template}>
        <h2>A little about you</h2>
        <p>This is your OpenPhone profile</p>
        <div className={styles.templateInputs}>
          <Input
            name="firstname"
            value={firstname}
            onChange={onChange}
            placeholder="First name"
            autoComplete="off"
          />
          <Input
            name="lastname"
            value={lastname}
            onChange={onChange}
            placeholder="Last name"
            autoComplete="off"
          />
        </div>
        <Button type="submit" disabled={disabledByRequest ? disabledByRequest : disabledByValue}>
          Continue
        </Button>
      </form>
      <Alert error={error} />
    </RedirectTemplate>
  );
};

export default OnboardingAccountContent;
