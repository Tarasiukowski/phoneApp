import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'components/atoms';
import { ElementFinder } from 'components/molecules';
import { SettingsTemplate } from 'templates';
import ElementList from './elementList';

import { ERROR_MESSAGES } from 'common/errorsMessages';
import { handleRequestError, removeGroup, createGroup } from 'utils';
import { update as updateUser, useUser } from 'setup/reducers/userReducer';
import { useError, useMultiTask } from 'contexts';
import { useFriends } from 'setup/reducers/friendsReducer';
import { Group } from 'interfaces';

const SettingsListsContent = () => {
  const dispatch = useDispatch();

  const user = useUser();
  const friends = useFriends();
  const multiTask = useMultiTask();

  const { groups = [] } = user || {};

  const { setError } = useError();

  const handleRemoveGroup = useCallback(async (group: Group) => {
    const { name } = group;

    try {
      await removeGroup(name);

      dispatch(
        updateUser({
          key: 'groups',
          value: group,
          option: { type: 'pull' },
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
            const emailsOfFriends = friends.map(({ email }) => email);

            if (emailsOfFriends.includes(email)) {
              return true;
            }

            setError({ msg: ERROR_MESSAGES.IS_NOT_FRIEND(email), id: Math.random() });
            return false;
          }

          return true;
        },
        onClose: () => {
          multiTask.toggleOpen(false);
        },
        onEnd: async (group: Group) => {
          try {
            await createGroup(group);

            dispatch(updateUser({ key: 'groups', value: group, option: { type: 'pull' } }));

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
        renderItem={(group) => {
          const { name } = group;

          return (
            <ElementList
              name={name}
              key={name}
              onClick={() => {
                handleRemoveGroup(group);
              }}
            />
          );
        }}
      />
    </SettingsTemplate>
  );
};

export { SettingsListsContent };
