import { useState, useEffect, useMemo, useCallback, ChangeEventHandler } from 'react';

import { ImageUser, Input, Button } from 'components/atoms';
import { SettingsTemplate } from 'templates';

import styles from './profile.module.scss';
import { useUser } from 'setup/reducers/userReducer';
import { fetcher, handleRequestError, verifyUser, updateUser } from 'utils';
import { ERROR_MESSAGES } from 'common';
import { useError, useMultiTask } from 'contexts';
import { useMutation } from 'hooks';

const SettingsProfileContent = () => {
  const { setError } = useError();
  const loggedUser = useUser();
  const multiTask = useMultiTask();
  const { mutate, status } = useMutation(updateUser);

  const fullname = loggedUser?.fullname;

  const [fields, setFields] = useState({
    firstname: fullname?.firstname || '',
    lastname: fullname?.lastname || '',
  });

  const { firstname: firstnameValue, lastname: lastnameValue } = fields;

  const implementedChange =
    firstnameValue !== fullname?.firstname || lastnameValue !== fullname?.lastname;
  const validFullname = Boolean(!firstnameValue?.length || !lastnameValue?.length);
  const isDisabled = !implementedChange || validFullname || status === 'loading';

  useEffect(() => {
    if (!multiTask.open) {
      resetData();
    }
  }, [multiTask.open]);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;

    setFields({
      ...fields,
      [target.name]: target.value,
    });
  };

  const save = useCallback(async () => {
    try {
      await mutate('fullname', { firstname: firstnameValue, lastname: lastnameValue });

      window.location.reload();
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  }, [fields]);

  const resetData = async () => {
    try {
      await fetcher('DELETE', '/user/update/newEmail');
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  };

  // FIXME
  const multitaskHandle = useMemo(
    () =>
      ({
        name: 'ChangeEmail',
        onNext: async (newEmail: string) => {
          if (newEmail === loggedUser?.email) {
            setError({
              msg: ERROR_MESSAGES.WITHOUT_CHANGE('email', 'singular'),
              id: Math.random(),
            });
            return false;
          }

          try {
            await fetcher('PUT', '/user/update', {
              value: newEmail,
              type: 'newEmail',
            });

            return true;
          } catch (err) {
            handleRequestError(err, (errorMsg) => {
              setError({ msg: errorMsg, id: Math.random() });
            });

            return false;
          }
        },
        onClose: async (verify?: boolean) => {
          multiTask.toggleOpen(false);
          verify && window.location.reload();
        },
        onEnd: async (code: string) => {
          try {
            await verifyUser('email', code);

            return true;
          } catch (err) {
            handleRequestError(err, (errorMsg) => {
              setError({ msg: errorMsg, id: Math.random() });
            });
            return false;
          }
        },
      } as const),
    [multiTask.open],
  );

  return (
    <SettingsTemplate>
      <h2 className="title">Account</h2>
      <p className="description">Manage your OpenPhone profile.</p>
      <div className={styles.templateImage}>
        <ImageUser extraStyle={{ size: '90%', fontSize: '3rem' }} />
      </div>
      <div className={styles.templateInputs}>
        <Input
          name="firstname"
          value={firstnameValue}
          placeholder="Firstname"
          autoComplete="off"
          onChange={handleOnChange}
        />
        <Input
          name="lastname"
          value={lastnameValue}
          onChange={handleOnChange}
          placeholder="Lastname"
          autoComplete="off"
        />
      </div>
      <p className={styles.label}>Email</p>
      <div className={styles.emailSet}>
        <p>{loggedUser?.email}</p>
        <Button
          id="ChangeEmail"
          onClick={() => {
            multiTask.toggleOpen(true, multitaskHandle);
          }}
          disabled={multiTask.open}
          width="auto"
          transparent
        >
          Change
        </Button>
      </div>
      <Button onClick={save} disabled={isDisabled} style={{ marginTop: '40px' }} width="auto">
        save
      </Button>
    </SettingsTemplate>
  );
};

export { SettingsProfileContent };
