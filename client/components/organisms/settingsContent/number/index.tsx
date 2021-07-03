import { useState, useEffect } from 'react';

import { Button } from 'components/atoms';
import { SelectNumberButton, SelectNumberList } from 'components/molecules';
import { SettingsTemplate } from 'templates';

import { useUser } from 'hooks';
import { fetcher, handleNotAllowedError } from 'utils';
import { useError } from 'contexts';

const SettingsNumberContent = () => {
  const [openList, setOpenList] = useState(false);
  const [disabledByRequest, setDisabledByRequest] = useState(false);
  const [number, setNumber] = useState<string | null>(null);

  const { setError } = useError();

  const user = useUser();

  const implementedChange = number ? user?.number === number : true;

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
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);

      return;
    }
  };

  const handleMultiTask = {
    onSelectNumber: (number: string) => {
      setNumber(number);
    },
    onClose: () => {
      setOpenList(false);
    },
  };

  return (
    <SettingsTemplate>
      <h2 className="title">Phone number</h2>
      <p className="description">Manage your phone number</p>
      <SelectNumberButton number={number} onClick={toggleOpenList} mini />
      {openList && <SelectNumberList {...handleMultiTask} />}
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
