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

  const conversations = user ? user.conversations : [];

  const multitaskHandle = {
    name: 'InviteFriend' as 'InviteFriend',
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
  };

  return (
    <div>
      <h2 className={styles.heading}>Friensd List</h2>
      <div className={styles.template}>
        {(friends ? friends : []).map((friend) => {
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
        <AddButton
          onClick={() => {
            multiTask.toggleOpen(true, multitaskHandle);
          }}
          id="InviteFriend"
        />
      </div>
    </div>
  );
};

export { FriendsList };
