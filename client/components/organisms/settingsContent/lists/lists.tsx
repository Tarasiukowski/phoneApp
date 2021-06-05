import { useState } from 'react';

import { Button } from '../../../atoms';
import { ElementFinder, Multitask } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';

import styles from './lists.module.scss';

const SettingsListsContent = () => {
  const [openMultiTask, setOpenMultiTask] = useState(false);

  const multitaskHandle = {
    name: 'CreateGroup' as 'CreateGroup',
    open: openMultiTask,
    onNext: () => {
      return true;
    },
    onClose: () => {
      setOpenMultiTask(false);
    },
    onEnd: async (data: string) => {
      console.log(data)

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
    </SettingsTemplate>
  );
};

export { SettingsListsContent };
