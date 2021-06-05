import { Button } from '../../../atoms';
import { ElementFinder } from '../../../molecules';
import { SettingsTemplate } from '../../../../templates';

import styles from './lists.module.scss';

const SettingsListsContent = () => {
  return (
    <SettingsTemplate>
      <h2 className="title">Manage Lists</h2>
      <p className="description">Manage the settings.</p>
      <Button
        onClick={() => {}}
        disabled={false}
        id="Create a group"
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
    </SettingsTemplate>
  );
};

export { SettingsListsContent };
