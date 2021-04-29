import SettingsTemplate from '../../../../templates/settingsTemplate/settingsTemplate';
import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';
import styles from './blocklist.module.scss';

const SettingsBlocklistContent = () => (
  <SettingsTemplate>
    <h2 className="title">Blocklist</h2>
    <p className="description">Your list of blocked phone numbers.</p>
    <div className={styles.list}>
      <Input placeholder="Select for a number" />
      <div className={styles.listElement}>
        <p>876-8768</p>
        <Button width="auto">Delete</Button>
      </div>
      {/* <p className={styles.info}>No one's blocked, woohoo 🌞</p> */}
    </div>
  </SettingsTemplate>
);

export default SettingsBlocklistContent;
