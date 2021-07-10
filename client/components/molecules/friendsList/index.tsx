import { useMemo } from 'react';
import Link from 'next/link';

import { UserCard } from 'components/atoms';
import AddButton from './addButton';

import { fetcher, handleRequestError } from 'utils';
import { useError, useMultiTask } from 'contexts';
import { useFriends } from 'setup/reducers/friendsReducer';
import { useUser } from 'setup/reducers/userReducer';
import styles from './friendsList.module.scss';

const FriendsList = () => {
  const user = useUser();
  const friends = useFriends();
  const multiTask = useMultiTask();
  const { setError } = useError();

  const { conversations = [] } = user || {};

  const multitaskHandle = useMemo(
    () =>
      ({
        name: 'InviteFriend',
        onClose: () => {
          multiTask.toggleOpen(false);
        },
        onEnd: async (to: string) => {
          try {
            await fetcher('POST', '/user/invite', {
              to,
            });

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

  const hanldeAddButton = () => {
    multiTask.toggleOpen(true, multitaskHandle);
  };

  return (
    <div>
      <h2 className={styles.heading}>Friensd List</h2>
      <div className={styles.template}>
        {friends.map((friend) => {
          const conversation = conversations?.find(
            (conversation) => friend.email === conversation.with,
          );

          if (conversation) {
            return (
              <Link
                href={`/inbox/${conversation.id}`}
                key={friend.email}
                children={<UserCard member={friend} elemList />}
              />
            );
          } else {
            return <UserCard member={friend} key={friend.email} elemList />;
          }
        })}
        <AddButton onClick={hanldeAddButton} id="InviteFriend" />
      </div>
    </div>
  );
};

export { FriendsList };
