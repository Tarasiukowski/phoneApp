import { useState } from 'react';
import { useSelector } from 'react-redux';

import AddButton from './addButton/addButton';
import FriendsListElement from '../../atoms/userCard/userCard';
import Multitask from '../multitask/multitask';
import Alert from '../../atoms/alert/alert';

import { selectFriends } from '../../../reducers/friendsReducer';
import { selectUser } from '../../../reducers/userReducer';
import { ERROR_NOT_ALLOWED } from '../../../common/errors';
import { fetcher } from '../../../utils';
import { Error } from '../../../interfaces';
import styles from './friendsList.module.scss';

const FriendsList = () => {
  const [openMultiTask, setOpenMultiTask] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { email, conversations } = useSelector(selectUser);
  const friends = useSelector(selectFriends);

  const multitaskHandle = {
    close: () => {
      setOpenMultiTask(false);
    },
    end: async (to: string) => {
      const { error, errorMsg } = await fetcher('POST', 'user/invite', {
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

  const { close, end } = multitaskHandle;

  return (
    <div>
      <h2 className={styles.heading}>Friensd List</h2>
      <div className={styles.template}>
        {conversations.map((conversation) => {
          const friend = friends.find(({ email }) => email === conversation.email);

          if (friend) {
            return <FriendsListElement key={friend.email} member={friend} elemList />;
          }
        })}
        <AddButton
          onClick={() => {
            setOpenMultiTask(true);
          }}
          id="InviteFriend"
        />
      </div>
      <Multitask name="InviteFriend" open={openMultiTask} onClose={close} onEnd={end} />
      <Alert error={error} />
    </div>
  );
};

export default FriendsList;
