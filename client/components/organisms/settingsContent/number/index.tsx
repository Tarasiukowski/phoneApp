import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Alert, Button } from '../../../atoms';
import { SelectNumberButton, SelectNumberList } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';

import { Error } from '../../../../interfaces';
import { selectUser } from '../../../../reducers/userReducer';
import { fetcher } from '../../../../utils';

const SettingsNumberContent = () => {
  const [openList, setOpenList] = useState(false);
  const [disabledByRequest, setDisabledByRequest] = useState(false);
  const [number, setNumber] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const user = useSelector(selectUser);

  const implementedChange = user ? user.number === number : true;

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

    const { errorMsg } = await fetcher('PUT', '/user/update', { number });

    if (errorMsg) {
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
      <Alert error={error} />
    </SettingsTemplate>
  );
};

export { SettingsNumberContent };
