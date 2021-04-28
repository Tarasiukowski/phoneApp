import { Button } from '../../../atoms/button/button';
import styles from './contacts.module.scss';

const SettingsContactContent = () => (
  <div className={styles.template}>
    <h2 className={styles.title}>Contacts</h2>
    <p className={styles.description}>Manage the settings.</p>
    <div className={styles.dangerZone}>
      <h4>Danger Zone</h4>
      <p className={styles.description}>
        This will permanently delete all your contacts from OpenPhone.
      </p>
      <Button waring width="auto">Delete All Contacts</Button>
    </div>
  </div>
);

export default SettingsContactContent;
