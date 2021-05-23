import { ChangeEvent, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';

import SettingsTemplate from '../../../../templates/settingsTemplate/settingsTemplate';
import ImageUser from '../../../atoms/imageUser/imageUser';
import { Input } from '../../../atoms/input/input';
import { Button } from '../../../atoms/button/button';
import Alert from '../../../atoms/alert/alert';
import Multitask from '../../../molecules/multitask/multitask';

import styles from './profile.module.scss';
import { InputsValues } from './types';
import { selectUser } from '../../../../reducers/userReducer';
import { fetcher } from '../../../../utils';
import { Error } from '../../../../interfaces';
import { ERROR_NOT_ALLOWED, WITHOUT_CHANGE } from '../../../../common/errors';

const SettingsProfileContent = () => {
  const [error, setError] = useState<Error | null>(null);
  const [openMultiTask, setOpenMultiTask] = useState<boolean>(false);

  const {
    fullname: { firstname, lastname },
    email,
  } = useSelector(selectUser);

  const [inputsValues, setInputsValues] = useReducer(
    (prevState: InputsValues, state: InputsValues) => ({ ...prevState, ...state }),
    { firstname, lastname },
  );

  const { firstname: firstnameValue, lastname: lastnameValue } = inputsValues;

  const handleOnChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    setInputsValues({
      [target.name]: target.value,
    });
  };

  const save = async () => {
    if (firstnameValue !== firstname || lastnameValue !== lastname) {
      const data = await fetcher('POST', 'user/verifyByCode', {
        email,
        fullname: { firstname: firstnameValue, lastname: lastnameValue },
      });

      if (data.error) {
        setError({ msg: data.errorMsg, id: Math.random() });
      }

      window.location.reload();
      return;
    }

    setError({ msg: WITHOUT_CHANGE('name and surname', 'plural'), id: Math.random() });
  };

  const multitaskHandle = {
    name: 'ChangeEmail' as 'ChangeEmail',
    open: openMultiTask,
    onNext: async (newEmail: string) => {
      if (newEmail === email) {
        setError({ msg: WITHOUT_CHANGE('email', 'singular'), id: Math.random() });
        return false;
      }

      const data = await fetcher('PUT', 'user/update', {
        email,
        newEmail,
        option: 'newEmail',
      });

      if (data.error) {
        setError({ msg: data.errorMsg, id: Math.random() });

        if (data.errorMsg === ERROR_NOT_ALLOWED) {
          window.location.reload();
        }
        return false;
      }

      return true;
    },
    onClose: (verify?: boolean) => {
      fetcher('PUT', 'user/update', {
        email,
        field: 'newEmail',
        option: 'removeField',
      });

      setOpenMultiTask(false);
      verify ? window.location.reload() : null;
    },
    onEnd: async (code: string) => {
      const data = await fetcher('POST', 'user/verifyByCode', {
        email,
        code,
        option: 'verifyNewEmail',
      });

      if (data.error) {
        setError({ msg: data.errorMsg, id: Math.random() });
        return false;
      }

      return true;
    },
  };

  return (
    <SettingsTemplate>
      <h2 className="title">Account</h2>
      <p className="description">Manage your OpenPhone profile.</p>
      <div className={styles.templateImage}>
        <ImageUser size="90%" fontSize="3rem" />
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
      <Button onClick={save} disabled={false} width="auto">
        save
      </Button>
      <p className={styles.label}>Email</p>
      <div className={styles.emailSet}>
        <p>{email}</p>
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
      <Alert error={error} />
      <Multitask {...multitaskHandle} />
    </SettingsTemplate>
  );
};

export default SettingsProfileContent;
