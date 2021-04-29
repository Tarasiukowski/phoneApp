import SettingsTemplate from '../../../../templates/settingsTemplate/settingsTemplate';
import { Button } from '../../../atoms/button/button';
import styles from './contacts.module.scss';

const SettingsContactContent = () => (
  <SettingsTemplate>
    <h2 className="title">Contacts</h2>
    <p className="description">Manage the settings.</p>
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

export default SettingsContactContent;
