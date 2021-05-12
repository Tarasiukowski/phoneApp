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

const SettingsProfileContent = () => {
  const [error, setError] = useState<Error | null>(null);
  const [openMultiTask, setOpenMultiTask] = useState<boolean>(false);

  const { firstname, lastname, email } = useSelector(selectUser);

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
        firstname: firstnameValue,
        lastname: lastnameValue,
      });

      if (data.error) {
        setError({ msg: data.errorMsg, id: Math.random() });
      }

      window.location.reload();
      return;
    }

    setError({ msg: 'error - name and surname are the same', id: Math.random() });
  };

  const multitaskHandle = {
    onNext: async (newEmail: string) => {
      if (newEmail === email) {
        setError({ msg: 'error - email is the same', id: Math.random() });
        return false;
      }

      const data = await fetcher('PUT', 'user/update', {
        email,
        newEmail,
      });

      if (data.error) {
        setError({ msg: data.errorMsg, id: Math.random() });

        if (data.errorMsg === 'error - functionality not allowed') {
          window.location.reload();
        }
        return false;
      }

      return true;
    },
    onClose: (verify?: boolean) => {
      fetcher('PUT', 'user/update', {
        email,
        fieldName: 'newEmail',
        options: {
          removeField: true,
        },
      });

      setOpenMultiTask(false);
      verify ? window.location.reload() : null;
    },
    onEnd: async (code: string) => {
      const data = await fetcher('POST', 'user/verifyByCode', {
        email,
        code,
        options: {
          verifyNewEmail: true,
        },
      });

      if (data.error) {
        setError({ msg: data.errorMsg, id: Math.random() });
        return false;
      }

      return true;
    },
  };

  const { onNext, onEnd, onClose } = multitaskHandle;

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
      <Multitask
        name="ChangeEmail"
        open={openMultiTask}
        onNext={onNext}
        onEnd={onEnd}
        onClose={onClose}
      />
    </SettingsTemplate>
  );
};

export default SettingsProfileContent;
