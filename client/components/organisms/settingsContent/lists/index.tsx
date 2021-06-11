import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Alert, Button } from '../../../atoms';
import { ElementFinder, Multitask } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';

import { GroupData } from '../../../molecules/multitask/types';
import { selectFriends } from '../../../../reducers/friendsReducer';
import { Error } from '../../../../interfaces';
import { ERROR} from '../../../../common/errors';
import { fetcher, getObjectsKeysFromArray } from '../../../../utils';
import { selectUser } from '../../../../reducers/userReducer';
import styles from './lists.module.scss';

const SettingsListsContent = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const friends = useSelector(selectFriends);
  const { email } = useSelector(selectUser);

  const multitaskHandle = {
    name: 'CreateGroup' as 'CreateGroup',
    open: openMultiTask,
    onNext: (email: string) => {
      const emailsOfFriends = getObjectsKeysFromArray(friends, 'email');

      if (emailsOfFriends.includes(email)) {
        return true;
      }

      setError({ msg: ERROR.IS_NOT_FRIEND(email), id: Math.random() });
      return true;
    },
    onClose: () => {
      setOpenMultiTask(false);
    },
    onEnd: async (groupData: GroupData) => {
      const { errorMsg } = await fetcher('POST', '/group/create', { email, ...groupData });

      if (errorMsg) {
        setError({ msg: errorMsg, id: Math.random() });
        return false;
      }

      return true;
    },
  };

  return (
    <SettingsTemplate>
      <h2 className="title">Manage Lists</h2>
      <p className="description">Manage the settings.</p>
      <Button
        onClick={() => {
          setOpenMultiTask(true);
        }}
        disabled={openMultiTask}
        id="CreateGroup"
        style={{ margin: '37px 0 17px 0' }}
        width="auto"
      >
        Create a group
      </Button>
      <ElementFinder
        data={[]}
        filterKey=""
        placeholder="Search for a group name"
        info="No groups to show"
        renderList={() => null}
      />
      <div className={styles.dangerZone}>
        <h4>Danger Zone</h4>
        <p className={styles.info}>
          This will permanently delete all your contacts from OpenPhone.
        </p>
        <Button waring width="auto">
          Delete All Contacts
        </Button>
      </div>
      <Multitask {...multitaskHandle} />
      <Alert error={error} />
    </SettingsTemplate>
  );
};

export { SettingsListsContent };
