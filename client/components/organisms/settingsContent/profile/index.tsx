import { ChangeEvent, useReducer, useEffect, useMemo, useCallback } from 'react';

import { ImageUser, Input, Button } from 'components/atoms';
import { SettingsTemplate } from 'templates';

import styles from './profile.module.scss';
import { InputsValues } from './types';
import { useUser } from 'setup/reducers/userReducer';
import { fetcher, handleRequestError } from 'utils';
import { ERROR } from 'common';
import { useError, useMultiTask } from 'contexts';

const SettingsProfileContent = () => {
  const { setError } = useError();
  const loggedUser = useUser();
  const multiTask = useMultiTask();

  const fullname = loggedUser?.fullname;

  const [inputsValues, setInputsValues] = useReducer(
    (prevState: InputsValues, state: InputsValues) => ({ ...prevState, ...state }),
    { firstname: fullname?.firstname, lastname: fullname?.lastname },
  );

  const { firstname: firstnameValue, lastname: lastnameValue } = inputsValues;

  const implementedChange =
    firstnameValue !== fullname?.firstname || lastnameValue !== fullname?.lastname;
  const validFullname = Boolean(!firstnameValue?.length || !lastnameValue?.length);
  const isDisabled = !implementedChange || validFullname;

  const handleOnChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    setInputsValues({
      [target.name]: target.value,
    });
  };

  const save = useCallback(async () => {
    try {
      await fetcher('PUT', '/user/update/fullname', {
        value: { firstname: firstnameValue, lastname: lastnameValue },
      });
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
      return;
    }

    window.location.reload();
  }, [inputsValues]);

  const resetData = async () => {
    try {
      await fetcher('DELETE', '/user/update/newEmail');
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
      return;
    }
  };

  useEffect(() => {
    if (multiTask.open === false) {
      resetData();
    }
  }, [multiTask.open]);

  const multitaskHandle = useMemo(
    () =>
      ({
        name: 'ChangeEmail',
        onNext: async (newEmail: string) => {
          if (newEmail === loggedUser?.email) {
            setError({ msg: ERROR.WITHOUT_CHANGE('email', 'singular'), id: Math.random() });
            return false;
          }

          try {
            await fetcher('PUT', '/user/update/newEmail', {
              newEmail,
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
            await fetcher('POST', '/user/verify/email', {
              code,
            });

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
