import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'components/atoms';
import { Multitask, ElementFinder } from 'components/molecules';
import { SettingsTemplate } from 'templates';
import ElementList from './elementList';

import { fetcher, handleNotAllowedError } from 'utils';
import { Member } from 'interfaces';
import { useFriends } from 'hooks';
import { remove } from 'reducers/friendsReducer';
import { useError } from 'contexts';

const SettingsFriendsContent = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);

  const friends = useFriends();
  const dispatch = useDispatch();
  const { setError } = useError();

  const removeFriend = async (user: Member) => {
    const { email } = user;

    try {
      await fetcher('POST', '/user/friends/remove', {
        friendEmail: email,
      });
    } catch (err) {
      const { data, status } = err.response;
      const { errorMsg } = data;

      setError({ msg: errorMsg, id: Math.random() });

      handleNotAllowedError(status);
      return;
    }

    dispatch(remove({ by: 'email', value: email }));
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
        const { data, status } = err.response;
        const { errorMsg } = data;

        setError({ msg: errorMsg, id: Math.random() });

        handleNotAllowedError(status);

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
