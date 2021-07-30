import { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import { Button, Input } from 'components/atoms';

import { handleRequestError, updateUser } from 'utils';
import { useError, useLoading } from 'contexts';
import { paths } from '../../../../constants';
import styles from './account.module.scss';

const OnboardingAccountContent = () => {
  const [fields, setFields] = useState({ firstname: '', lastname: '' });
  const [disabledByRequest, setDisabledByRequest] = useState(false);

  const router = useRouter();

  const { setError } = useError();
  const { toggleLoading } = useLoading();

  const { firstname, lastname } = fields;

  const disabledByValue = firstname && lastname ? !firstname.length || !lastname.length : true;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setFields({ ...fields, [target.name]: value });
  };

  const next = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setDisabledByRequest(true);

      try {
        await updateUser('fullname', fields);
      } catch (err) {
        handleRequestError(err, (errorMsg) => {
          setError({ msg: errorMsg, id: Math.random() });
        });
        return;
      } finally {
        try {
          await updateUser('onBoarding', {
            value: true,
            stage: null,
          });
        } catch (err) {
          handleRequestError(err, (errorMsg) => {
            setError({ msg: errorMsg, id: Math.random() });
          });
        }
      }

      setDisabledByRequest(false);
      toggleLoading(true);

      router.push(paths.contacts);
    },
    [fields],
  );

  return (
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
  );
};

export { OnboardingAccountContent };
