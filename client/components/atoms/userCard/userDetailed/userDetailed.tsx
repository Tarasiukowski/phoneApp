import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { UserCard, ButtonNavigation } from '../../index';

import { useError, useMultiTask } from 'contexts';
import { buttonsData, buttonNavigationSettings } from './data';
import { props } from './types';
import styles from './UserDetailed.module.scss';
import { fetcher, handleRequestError, logout } from 'utils';
import { update as updateBlocklist } from 'setup/reducers/blocklistReducer';
import { update as updateFriends } from 'setup/reducers/friendsReducer';
import { update as updateInvites } from 'setup/reducers/invitesReducer';
import { paths } from '../../../../constants';

const UserDetailed = ({ userDetailedRef }: props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const multiTask = useMultiTask();
  const { setError } = useError();

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

  const resetData = () => {
    dispatch(updateInvites([]));
    dispatch(updateBlocklist([]));
    dispatch(updateFriends([]));
  };

  const logoutCb = () => {
    router.push(paths.SingUp).then(() => {
      resetData();
    });
  };

  return (
    <div className={styles.box} ref={userDetailedRef}>
      <div>
        <UserCard big />
      </div>
      <div className={styles.template}>
        {buttonsData.map((data) => {
          const handleClick = useCallback(() => {
            data.handleInvite && multiTask.toggleOpen(true, multitaskHandle);
            data.logout && logout(logoutCb);
          }, []);

          return (
            <ButtonNavigation
              onClick={handleClick}
              key={data.content}
              {...data}
              {...buttonNavigationSettings}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserDetailed;
