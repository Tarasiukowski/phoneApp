import { useDispatch } from 'react-redux';

import { Button } from 'components/atoms';
import { ElementFinder } from 'components/molecules';
import { SettingsTemplate } from 'templates';
import ElementList from './elementList';

import { GroupData } from 'components/molecules/multitask/types';
import { ERROR } from 'common/errors';
import { fetcher, getObjectsKeysFromArray, handleRequestError } from 'utils';
import { updateGroup, useUser } from 'setup/reducers/userReducer';
import { useError, useMultiTask } from 'contexts';
import { useFriends } from 'setup/reducers/friendsReducer';
import { Group } from 'interfaces';
import { useCallback, useMemo } from 'react';

const SettingsListsContent = () => {
  const dispatch = useDispatch();

  const user = useUser();
  const friends = useFriends();
  const multiTask = useMultiTask();

  const { groups = [] } = user || {};

  const { setError } = useError();

  const removeGroup = useCallback(async (name: string) => {
    try {
      await fetcher('DELETE', '/group/remove', { name });

      dispatch(
        updateGroup({
          key: 'groups',
          option: { type: 'pull', by: 'name', value: name },
        }),
      );
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  }, []);

  const multitaskHandle = useMemo(
    () =>
      ({
        name: 'CreateGroup',
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
          multiTask.toggleOpen(false);
        },
        onEnd: async (groupData: GroupData) => {
          try {
            await fetcher('POST', '/group/create', { ...groupData });

            const data = groupData as Group;

            dispatch(updateGroup({ key: 'groups', data, option: { type: 'push' } }));

            return true;
          } catch (err) {
            handleRequestError(err, (errorMsg) => {
              setError({ msg: errorMsg, id: Math.random() });
            });
            return false;
          }
        },
      } as const),
    [],
  );

  return (
    <SettingsTemplate>
      <h2 className="title">Manage Lists</h2>
      <p className="description">Manage the settings.</p>
      <Button
        onClick={() => {
          multiTask.toggleOpen(true, multitaskHandle);
        }}
        disabled={multiTask.open}
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
    </SettingsTemplate>
  );
};

export { SettingsListsContent };
