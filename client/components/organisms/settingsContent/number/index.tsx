import { useState, useCallback, useMemo } from 'react';

import { Button } from 'components/atoms';
import { SelectNumberButton, SelectNumberList } from 'components/molecules';
import { SettingsTemplate } from 'templates';

import { useUser } from 'setup/reducers/userReducer';
import { handleRequestError, updateUser } from 'utils';
import { useError } from 'contexts';
import { useDidMount, useMutation } from 'hooks';

const SettingsNumberContent = () => {
  const [openList, setOpenList] = useState(false);
  const [number, setNumber] = useState<string | null>(null);

  const { setError } = useError();
  const user = useUser();
  const { mutate, status } = useMutation(updateUser);

  const implementedChange = number ? user?.number === number : true;
  const disabled = implementedChange || status === 'loading';

  useDidMount(() => {
    setNumber(user ? user.number : null);
  });

  const toggleOpenList = useCallback(() => {
    setOpenList(!openList);
  }, []);

  const onSave = useCallback(async () => {
    try {
      number && (await mutate('number', number));
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  }, [number]);

  const handleSelectNumberList = useMemo(
    () => ({
      onSelectNumber: (number: string) => {
        setNumber(number);
      },
      onClose: () => {
        setOpenList(false);
      },
    }),
    [],
  );

  return (
    <SettingsTemplate>
      <h2 className="title">Phone number</h2>
      <p className="description">Manage your phone number</p>
      <SelectNumberButton number={number} onClick={toggleOpenList} mini />
      {openList && <SelectNumberList {...handleSelectNumberList} />}
      <Button onClick={onSave} disabled={disabled} style={{ marginTop: '40px' }} width="auto">
        save
      </Button>
    </SettingsTemplate>
  );
};

export { SettingsNumberContent };
