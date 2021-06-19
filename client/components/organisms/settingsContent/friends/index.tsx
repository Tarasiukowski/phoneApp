import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Alert } from '../../../atoms';
import { Multitask, ElementFinder } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';
import ElementList from './elementList';

import { fetcher } from '../../../../utils';
import { Error, User } from '../../../../interfaces';
import { ERROR } from '../../../../common/errors';
import { remove, selectFriends } from '../../../../reducers/friendsReducer';

const SettingsFriendsContent = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const friends = useSelector(selectFriends);

  const dispatch = useDispatch();

  const removeFriend = async (user: User) => {
    const { email } = user;

    const { errorMsg } = await fetcher('POST', '/user/friends/remove', {
      friendEmail: email,
    });

    if (errorMsg) {
      setError({ msg: errorMsg, id: Math.random() });
      return;
    }

    dispatch(remove({ email }));
  };

  const multitaskHandle = {
    name: 'InviteFriend' as 'InviteFriend',
    open: openMultiTask,
    onClose: () => {
      setOpenMultiTask(false);
    },
    onEnd: async (to: string) => {
      const { errorMsg } = await fetcher('POST', '/user/invite', {
        to,
      });

      if (errorMsg) {
        setError({ msg: errorMsg, id: Math.random() });

        if (errorMsg === ERROR.NOT_ALLOWED) {
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
        placeholder="Search for a number"
        info="User not found"
        renderList={(data) =>
          data.map((friend) => <ElementList user={friend} onClick={removeFriend} />)
        }
      />
      <Alert error={error} />
      <Multitask {...multitaskHandle} />
    </SettingsTemplate>
  );
};

export { SettingsFriendsContent };
