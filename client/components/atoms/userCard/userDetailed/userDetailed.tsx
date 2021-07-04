import { UserCard, ButtonNavigation } from '../../index';

import { useError, useMultiTask } from 'contexts';
import { buttonsData, buttonNavigationSettings } from './data';
import { props } from './types';
import styles from './UserDetailed.module.scss';
import { fetcher, handleNotAllowedError } from 'utils';

const UserDetailed = ({ userDetailedRef }: props) => {
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
        const { data, status } = err.response;
        const { errorMsg } = data;

        setError({ msg: errorMsg, id: Math.random() });

        handleNotAllowedError(status);

        return false;
      }
    },
  };

  return (
    <div className={styles.box} ref={userDetailedRef}>
      <div>
        <UserCard big />
      </div>
      <div className={styles.template}>
        {buttonsData.map((data) => {
          if (data.handleInvite) {
            return (
              <ButtonNavigation
                onClick={() => {
                  multiTask.toggleOpen(true, multitaskHandle);
                }}
                key={data.content}
                {...data}
                {...buttonNavigationSettings}
              />
            );
          }

          return <ButtonNavigation key={data.content} {...data} {...buttonNavigationSettings} />;
        })}
      </div>
    </div>
  );
};

export default UserDetailed;
