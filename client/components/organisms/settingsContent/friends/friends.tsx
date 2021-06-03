import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SettingsTemplate from '../../../../templates/settingsTemplate/settingsTemplate';
import { Button } from '../../../atoms/button/button';
import UserCard from '../../../atoms/userCard/userCard';
import ElementFinder from '../../../molecules/elementFinder/elementFinder';
import Multitask from '../../../molecules/multitask/multitask';
import Alert from '../../../atoms/alert/alert';

import styles from './friends.module.scss';
import { fetcher } from '../../../../utils';
import { selectUser } from '../../../../reducers/userReducer';
import { Error } from '../../../../interfaces';
import { ERROR_NOT_ALLOWED } from '../../../../common/errors';
import { remove, selectFriends } from '../../../../reducers/friendsReducer';

export const SettingsFriendsContent = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { email } = useSelector(selectUser);
  const friends = useSelector(selectFriends);

  const dispatch = useDispatch();

  const removeFriend = async (friendEmail: string) => {
    const { error, errorMsg } = await fetcher('POST', '/user/friends/remove', {
      email,
      friendEmail,
    });

    if (error) {
      setError({ msg: errorMsg, id: Math.random() });
      return;
    }

    dispatch(remove({ email: friendEmail }));
  };

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
    <SettingsTemplate>
      <h2 className="title">Friends</h2>
      <p className="description">Manage all the members in your friend list.</p>
      <Button
        onClick={() => {
          setOpenMultiTask(true);
        }}
        disabled={openMultiTask}
        id="InviteFriend"
        style={{ margin: '37px 0 17px 0' }}
        width="auto"
      >
        Invite a member
      </Button>
      <ElementFinder
        data={friends}
        filterKey="fullname"
        info="User not found"
        renderList={(data) =>
          data.map((friend) => {
            const { email } = friend;

            return (
              <div onClick={() => removeFriend(email)} className={styles.elementList} key={email}>
                <UserCard member={friend} big />
                <Button width="auto">Remove</Button>
              </div>
            );
          })
        }
      />
      <Alert error={error} />
      <Multitask {...multitaskHandle} />
    </SettingsTemplate>
  );
};
