import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { UserCard } from '../../atoms';
import { Multitask } from '../index';
import AddButton from './addButton';

import { selectFriends } from '../../../reducers/friendsReducer';
import { selectUser } from '../../../reducers/userReducer';
import { fetcher, handleNotAllowedError } from '../../../utils';
import { ErrorContext } from '../../../contexts';
import styles from './friendsList.module.scss';

const FriendsList = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);

  const user = useSelector(selectUser);
  const friends = useSelector(selectFriends);

  const { setError } = useContext(ErrorContext);

  const conversations = user ? user.conversations : [];

  const multitaskHandle = {
    name: 'InviteFriend' as 'InviteFriend',
    open: openMultiTask,
    onClose: () => {
      setOpenMultiTask(false);
    },
    onEnd: async (to: string) => {
      try {
        await fetcher('POST', '/user/invite', {
          to,
        });

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
    <div>
      <h2 className={styles.heading}>Friensd List</h2>
      <div className={styles.template}>
        {(friends ? friends : []).map((friend) => {
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
    </div>
  );
};

export { FriendsList };
