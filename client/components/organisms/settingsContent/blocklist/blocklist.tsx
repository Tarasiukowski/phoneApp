import { Button } from '../../../atoms/button/button';
import { Input } from '../../../atoms/input/input';
import styles from './blocklist.module.scss';

const SettingsBlocklistContent = () => (
  <div className={styles.template}>
    <h2 className={styles.title}>Blocklist</h2>
    <p className={styles.description}>Your list of blocked phone numbers.</p>
    <div className={styles.list}>
      <Input placeholder="Select for a number" />
      <div className={styles.listElement}>
        <p>876-8768</p>
        <Button width="auto">Delete</Button>
      </div>
      {/* <p className={styles.info}>No one's blocked, woohoo 🌞</p> */}
    </div>
  </div>
);

export default SettingsBlocklistContent;
