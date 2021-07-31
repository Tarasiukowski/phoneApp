import { FormEvent, useState, useCallback, ChangeEventHandler } from 'react';
import { useRouter } from 'next/router';

import { Button, Input } from 'components/atoms';

import { handleRequestError, updateUser } from 'utils';
import { useMutation } from 'hooks';
import { useError, useLoading } from 'contexts';
import { paths } from '../../../../constants';
import styles from './account.module.scss';

const OnboardingAccountContent = () => {
  const [fields, setFields] = useState({ firstname: '', lastname: '' });

  const router = useRouter();

  const { setError } = useError();
  const { toggleLoading } = useLoading();
  const { mutate, status } = useMutation(updateUser);

  const { firstname, lastname } = fields;
  const disabled = status === 'loading' || !firstname.length || !lastname.length;

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    setFields({ ...fields, [target.name]: value });
  };

  const next = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await mutate('fullname', fields);
      } catch (err) {
        handleRequestError(err, (errorMsg) => {
          setError({ msg: errorMsg, id: Math.random() });
        });
        return;
      } finally {
        try {
          await mutate('onBoarding', {
            value: true,
            stage: null,
          });

          toggleLoading(true);
          router.push(paths.contacts);
        } catch (err) {
          handleRequestError(err, (errorMsg) => {
            setError({ msg: errorMsg, id: Math.random() });
          });
        }
      }
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
      <Button type="submit" disabled={disabled}>
        Continue
      </Button>
    </form>
  );
};

export { OnboardingAccountContent };
