import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { UserCard, ButtonNavigation } from '../../index';

import { useError, useMultiTask } from 'contexts';
import { buttonsData, buttonNavigationSettings } from './data';
import { props } from './types';
import styles from './detailedView.module.scss';
import { handleRequestError, logout, invite } from 'utils';
import { update as updateBlocklist } from 'setup/reducers/blockListReducer';
import { update as updateFriends } from 'setup/reducers/friendsReducer';
import { update as updateInvites } from 'setup/reducers/invitesReducer';
import { paths } from '../../../../constants';
import { useLoading } from 'contexts/loadingContext';

const DetailedView = ({ userDetailedRef }: props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const multiTask = useMultiTask();
  const { setError } = useError();
  const { toggleLoading } = useLoading();

  const multitaskHandle = useMemo(
    () =>
      ({
        name: 'InviteFriend',
        onClose: () => {
          multiTask.toggleOpen(false);
        },
        onEnd: async (email: string) => {
          try {
            await invite(email);

            return true;
          } catch (err) {
            handleRequestError(err, (errorMsg) => {
              setError({ msg: errorMsg, id: Math.random() });
            });

            return false;
          }
        },
      } as const),
    [multiTask.open],
  );

  const resetData = () => {
    dispatch(updateInvites([]));
    dispatch(updateBlocklist([]));
    dispatch(updateFriends([]));
  };

  const handleOnRequestLogout = () => {
    toggleLoading(true);
  };

  const handleOnResponseLogout = () => {
    router.push(paths.singUp).then(() => {
      toggleLoading(false);
      resetData();
    });
  };

  const handleButtonNavigation = useCallback((data: typeof buttonsData[number]) => {
    data.handleInvite && multiTask.toggleOpen(true, multitaskHandle);
    data.logout && logout(handleOnRequestLogout, handleOnResponseLogout);
  }, []);

  return (
    <div className={styles.box} ref={userDetailedRef}>
      <div>
        <UserCard big />
      </div>
      <div className={styles.template}>
        {buttonsData.map((data) => (
          <ButtonNavigation
            onClick={() => handleButtonNavigation(data)}
            key={data.content}
            {...data}
            {...buttonNavigationSettings}
          />
        ))}
      </div>
    </div>
  );
};

export default DetailedView;
