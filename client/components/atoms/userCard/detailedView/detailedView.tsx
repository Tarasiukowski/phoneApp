import { useCallback, useMemo, forwardRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { UserCard, ButtonNavigation } from '../../index';

import { useError, useMultiTask } from 'contexts';
import { buttonsData, buttonNavigationSettings } from './data';
import styles from './detailedView.module.scss';
import { handleRequestError, logout, invite } from 'utils';
import { update as updateBlocklist } from 'setup/reducers/blockListReducer';
import { update as updateFriends } from 'setup/reducers/friendsReducer';
import { update as updateInvites } from 'setup/reducers/invitesReducer';
import { paths } from '../../../../constants';
import { useLoading } from 'contexts/loadingContext';

const DetailedView = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const inviteFriendPopup = useMultiTask();
  const { setError } = useError();
  const { toggleLoading } = useLoading();

  const inviteFriendHandle = useMemo(
    () =>
      ({
        name: 'InviteFriend',
        onClose: () => {
          inviteFriendPopup.toggleOpen(false);
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
    [inviteFriendPopup.open],
  );

  const handleLogout = useMemo(
    () => ({
      onRequest() {
        toggleLoading(true);
      },
      onResponse() {
        router.push(paths.singUp).then(() => {
          toggleLoading(false);
          resetData();
        });
      },
    }),
    [],
  );

  const resetData = () => {
    dispatch(updateInvites([]));
    dispatch(updateBlocklist([]));
    dispatch(updateFriends([]));
  };

  const handleButtonNavigation = useCallback((data: typeof buttonsData[number]) => {
    data.handleInvite && inviteFriendPopup.toggleOpen(true, inviteFriendHandle);
    data.logout && logout(handleLogout.onResponse, handleLogout.onResponse);
  }, []);

  return (
    <div className={styles.box} ref={ref}>
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
});

export default DetailedView;
