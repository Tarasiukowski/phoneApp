import { ChangeEvent, useReducer, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ImageUser, Input, Button } from '../../../atoms';
import { Multitask } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';

import styles from './profile.module.scss';
import { InputsValues } from './types';
import { selectUser } from '../../../../reducers/userReducer';
import { fetcher, handleNotAllowedError } from '../../../../utils';
import { ERROR } from '../../../../common/errors';
import { useError } from '../../../../contexts';

const SettingsProfileContent = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);

  const { setError } = useError();

  const loggedUser = useSelector(selectUser);

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

  const save = async () => {
    try {
      await fetcher('PUT', '/user/update', {
        fullname: { firstname: firstnameValue, lastname: lastnameValue },
      });
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
      return;
    }

    window.location.reload();
  };

  const resetData = async () => {
    try {
      await fetcher('DELETE', '/user/update/newEmail');
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
      return;
    }
  };

  useEffect(() => {
    if (openMultiTask === false) {
      resetData();
    }
  }, [openMultiTask]);

  const multitaskHandle = {
    name: 'ChangeEmail' as 'ChangeEmail',
    open: openMultiTask,
    onNext: async (newEmail: string) => {
      if (newEmail === loggedUser.email) {
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
        const { data, status } = err.response;
        const { errorMsg } = data;

        setError({ msg: errorMsg, id: Math.random() });

        handleNotAllowedError(status);

        return false;
      }
    },
    onClose: async (verify?: boolean) => {
      setOpenMultiTask(false);
      verify && window.location.reload();
    },
    onEnd: async (code: string) => {
      try {
        await fetcher('POST', '/user/verify/email', {
          code,
        });

        return true;
      } catch (err) {
        const { data, status } = err.response;
        const { errorMsg } = data;

        setError({ msg: errorMsg, id: Math.random() });

        handleNotAllowedError(status);
        return false;
      }
    },
  };

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
            setOpenMultiTask(true);
          }}
          disabled={openMultiTask}
          width="auto"
          transparent
        >
          Change
        </Button>
      </div>
      <Button onClick={save} disabled={isDisabled} style={{ marginTop: '40px' }} width="auto">
        save
      </Button>
      <Multitask {...multitaskHandle} />
    </SettingsTemplate>
  );
};

export { SettingsProfileContent };
