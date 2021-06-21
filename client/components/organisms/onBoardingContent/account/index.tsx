import { ChangeEvent, FormEvent, useState, useReducer, useContext } from 'react';

import { Button, Input } from '../../../atoms';
import { RedirectTemplate } from '../../../../templates';

import { fetcher } from '../../../../utils';
import { FormValues } from './types';
import { ErrorContext } from '../../../../contexts';
import styles from './account.module.scss';

const OnboardingAccountContent = () => {
  const [formValues, setFormValues] = useReducer(
    (prevState: FormValues, state: FormValues) => ({ ...prevState, ...state }),
    { firstname: '', lastname: '' },
  );
  const [disabledByRequest, setDisabledByRequest] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { setError } = useContext(ErrorContext);

  const { firstname, lastname } = formValues;

  const disabledByValue = firstname && lastname ? !firstname.length || !lastname.length : true;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setFormValues({
      [target.name]: value,
    });
  };

  const next = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDisabledByRequest(true);

    const { errorMsg } = await fetcher('PUT', '/user/update', {
      fullname: formValues,
    });

    if (errorMsg) {
      setError({ msg: errorMsg, id: Math.random() });
      window.location.reload();
      return;
    }

    const data = await fetcher('PUT', '/user/update', {
      redirectTo: '/contacts',
      onBoarding: true,
    });

    if (data.errorMsg) {
      setError({ msg: errorMsg, id: Math.random() });
      window.location.reload();
      return;
    }

    setRedirect(true);

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
    </RedirectTemplate>
  );
};

export { OnboardingAccountContent };
