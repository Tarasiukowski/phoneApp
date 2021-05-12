import { useState } from 'react';
import { useSelector } from 'react-redux';

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

const SettingsFriendsContent = () => {
  const [openMultiTask, setOpenMultiTask] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { email } = useSelector(selectUser);

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

        if (errorMsg === 'error - functionality not allowed') {
          window.location.reload();
        }

        return false;
      }

      return true;
    },
  };

  const { close, end } = multitaskHandle;

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
        margin="37px 0 17px 0"
        width="auto"
      >
        Invite a member
      </Button>
      <ElementFinder>
        <div className={styles.elementList}>
          <UserCard big />
          <Button width="auto">Remove</Button>
        </div>
      </ElementFinder>
      <Alert error={error} />
      <Multitask name="InviteFriend" open={openMultiTask} onClose={close} onEnd={end} />
    </SettingsTemplate>
  );
};
export default SettingsFriendsContent;
