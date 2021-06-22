import { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '../../../atoms';
import { SelectNumberButton, SelectNumberList } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';

import { selectUser } from '../../../../reducers/userReducer';
import { fetcher } from '../../../../utils';
import { ErrorContext } from '../../../../contexts';

const SettingsNumberContent = () => {
  const [openList, setOpenList] = useState(false);
  const [disabledByRequest, setDisabledByRequest] = useState(false);
  const [number, setNumber] = useState<string | null>(null);

  const { setError } = useContext(ErrorContext);

  const user = useSelector(selectUser);

  const implementedChange = user.number === number;

  useEffect(() => {
    setNumber(user ? user.number : null);
  }, []);

  useEffect(() => {
    if (disabledByRequest) {
      if (user.number === number) {
        setDisabledByRequest(false);
      }
    }
  }, [user]);

  const toggleOpenList = () => {
    setOpenList(!openList);
  };

  const onSave = async () => {
    setDisabledByRequest(true);

    try {
      await fetcher('PUT', '/user/update', { number });
    } catch (err) {
      const { errorMsg } = err.response.data;

      setError({ msg: errorMsg, id: Math.random() });

      return;
    }
  };

  return (
    <SettingsTemplate>
      <h2 className="title">Phone number</h2>
      <p className="description">Manage your phone number</p>
      <SelectNumberButton number={number} onClick={toggleOpenList} mini />
      {openList && (
        <SelectNumberList
          onSelectNumber={(number) => {
            setNumber(number);
          }}
          onClose={() => {
            setOpenList(false);
          }}
        />
      )}
      <Button
        onClick={onSave}
        disabled={disabledByRequest ? disabledByRequest : implementedChange}
        style={{ marginTop: '40px' }}
        width="auto"
      >
        save
      </Button>
    </SettingsTemplate>
  );
};

export { SettingsNumberContent };
