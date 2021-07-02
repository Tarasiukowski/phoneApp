import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../../../atoms';
import { Multitask, ElementFinder } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';
import ElementList from './elementList';

import { GroupData } from '../../../molecules/multitask/types';
import { ERROR } from '../../../../common/errors';
import { fetcher, getObjectsKeysFromArray, handleNotAllowedError } from '../../../../utils';
import { updateGroup } from '../../../../reducers/userReducer';
import { useError } from '../../../../contexts';
import { useFriends, useUser } from '../../../../hooks';
import { Group } from '../../../../interfaces';
import styles from './lists.module.scss';

const SettingsListsContent = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);

  const dispatch = useDispatch();

  const loggedUser = useUser();
  const friends = useFriends();

  const groups = loggedUser ? loggedUser.groups : [];

  const { setError } = useError();

  const removeGroup = async (name: string) => {
    try {
      await fetcher('DELETE', '/group/remove', { name });

      dispatch(
        updateGroup({
          key: 'groups',
          option: { type: 'pull', by: 'name', value: name },
        }),
      );
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
    }
  };

  const multitaskHandle = {
    name: 'CreateGroup' as 'CreateGroup',
    open: openMultiTask,
    onNext: (email: string, stage: number) => {
      if (stage > 0) {
        const emailsOfFriends = getObjectsKeysFromArray(friends, 'email');

        if (emailsOfFriends.includes(email)) {
          return true;
        }

        setError({ msg: ERROR.IS_NOT_FRIEND(email), id: Math.random() });
        return false;
      }

      return true;
    },
    onClose: () => {
      setOpenMultiTask(false);
    },
    onEnd: async (groupData: GroupData) => {
      try {
        await fetcher('POST', '/group/create', { ...groupData });

        const data = groupData as Group;

        dispatch(updateGroup({ key: 'groups', data, option: { type: 'push' } }));

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
      <h2 className="title">Manage Lists</h2>
      <p className="description">Manage the settings.</p>
      <Button
        onClick={() => {
          setOpenMultiTask(true);
        }}
        disabled={openMultiTask}
        id="CreateGroup"
        style={{ margin: '37px 0 17px 0' }}
        width="auto"
      >
        Create a group
      </Button>
      <ElementFinder
        data={groups}
        filterKey="name"
        placeholder="Search for a group name"
        notFound="No groups to show"
        renderItem={({ name }) => (
          <ElementList
            name={name}
            key={name}
            onClick={() => {
              removeGroup(name);
            }}
          />
        )}
      />
      <div className={styles.dangerZone}>
        <h4>Danger Zone</h4>
        <p className={styles.info}>
          This will permanently delete all your contacts from OpenPhone.
        </p>
        <Button waring width="auto">
          Delete All Contacts
        </Button>
      </div>
      <Multitask {...multitaskHandle} />
    </SettingsTemplate>
  );
};

export { SettingsListsContent };
