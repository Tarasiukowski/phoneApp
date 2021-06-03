import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { UserCard, Alert } from '../../atoms';
import { Multitask } from '../index';
import AddButton from './addButton/addButton';

import { selectFriends } from '../../../reducers/friendsReducer';
import { selectUser } from '../../../reducers/userReducer';
import { ERROR_NOT_ALLOWED } from '../../../common/errors';
import { fetcher } from '../../../utils';
import { Error } from '../../../interfaces';
import styles from './friendsList.module.scss';

const FriendsList = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { email, conversations } = useSelector(selectUser);
  const friends = useSelector(selectFriends);

  const multitaskHandle = {
    name: 'InviteFriend' as 'InviteFriend',
    open: openMultiTask,
    onClose: () => {
      setOpenMultiTask(false);
    },
    onEnd: async (to: string) => {
      const { error, errorMsg } = await fetcher('POST', '/user/invite', {
        email,
        to,
      });

      if (error) {
        setError({ msg: errorMsg, id: Math.random() });

        if (errorMsg === ERROR_NOT_ALLOWED) {
          window.location.reload();
        }

        return false;
      }

      return true;
    },
  };

  return (
    <div>
      <h2 className={styles.heading}>Friensd List</h2>
      <div className={styles.template}>
        {friends.map((friend) => {
          const conversation = conversations.find(
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
            return <UserCard member={friend} elemList />;
          }
        })}
        <AddButton
          onClick={() => {
            setOpenMultiTask(true);
          }}
          id="InviteFriend"
        />
      </div>
      <Multitask {...multitaskHandle} />
      <Alert error={error} />
    </div>
  );
};

export { FriendsList };
