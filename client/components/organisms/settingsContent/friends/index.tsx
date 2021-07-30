import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'components/atoms';
import { ElementFinder } from 'components/molecules';
import { SettingsTemplate } from 'templates';
import ElementList from './elementList';

import { invite, handleRequestError, removeFriend } from 'utils';
import { Member } from 'interfaces';
import { remove, useFriends } from 'setup/reducers/friendsReducer';
import { useError, useMultiTask } from 'contexts';

const SettingsFriendsContent = () => {
  const dispatch = useDispatch();

  const friends = useFriends();
  const { setError } = useError();
  const multiTask = useMultiTask();

  const handleRemoveFriend = useCallback(async (user: Member) => {
    const { email } = user;

    try {
      await removeFriend(email);

      dispatch(remove({ by: 'email', value: email }));
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  }, []);

  const multitaskHandle = useMemo(
    () =>
      ({
        name: 'InviteFriend',
        onClose: () => {
          multiTask.toggleOpen(false);
        },
        onEnd: async (email: string) => {
          try {
            await invite(email);

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
      <h2 className="title">Friends</h2>
      <p className="description">Manage all the members in your friend list.</p>
      <Button
        onClick={() => {
          multiTask.toggleOpen(true, multitaskHandle);
        }}
        disabled={multiTask.open}
        id="InviteFriend"
        style={{ margin: '37px 0 17px 0' }}
        width="auto"
      >
        Invite a member
      </Button>
      <ElementFinder
        data={friends}
        filterKey="fullname"
        placeholder="Search for a number"
        notFound="User not found"
        renderItem={(data) => <ElementList user={data} onClick={handleRemoveFriend} />}
      />
    </SettingsTemplate>
  );
};

export { SettingsFriendsContent };
