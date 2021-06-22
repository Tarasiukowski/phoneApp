import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../../atoms';
import { Multitask, ElementFinder } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';
import ElementList from './elementList';

import { fetcher } from '../../../../utils';
import { User } from '../../../../interfaces';
import { ERROR } from '../../../../common/errors';
import { remove, selectFriends } from '../../../../reducers/friendsReducer';
import { ErrorContext } from '../../../../contexts';

const SettingsFriendsContent = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);

  const friends = useSelector(selectFriends);

  const dispatch = useDispatch();

  const { setError } = useContext(ErrorContext);

  const removeFriend = async (user: User) => {
    const { email } = user;

    try {
      await fetcher('POST', '/user/friends/remove', {
        friendEmail: email,
      });
    } catch (err) {
      const { errorMsg } = err.response.data;
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
      try {
        await fetcher('POST', '/user/invite', {
          to,
        });

        return true;
      } catch (err) {
        const { errorMsg } = err.response.data;

        setError({ msg: errorMsg, id: Math.random() });

        if (errorMsg === ERROR.NOT_ALLOWED) {
          window.location.reload();
        }

        return false;
      }
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
        notFound="User not found"
        renderItem={(data) => <ElementList user={data} onClick={removeFriend} />}
      />
      <Multitask {...multitaskHandle} />
    </SettingsTemplate>
  );
};

export { SettingsFriendsContent };
