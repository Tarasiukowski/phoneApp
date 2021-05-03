import SettingsTemplate from '../../../../templates/settingsTemplate/settingsTemplate';
import { Button } from '../../../atoms/button/button';
import ElementFinder from '../../../molecules/elementFinder/elementFinder';

import styles from './blocklist.module.scss';

const SettingsBlocklistContent = () => (
  <SettingsTemplate>
    <h2 className="title">Blocklist</h2>
    <p className="description">Your list of blocked phone numbers.</p>
    <ElementFinder>
      <div className={styles.listElement}>
        <p>876-8768</p>
        <Button width="auto">Delete</Button>
      </div>
      {/* <p className={styles.info}>No one's blocked, woohoo 🌞</p> */}
    </ElementFinder>
  </SettingsTemplate>
);

export default SettingsBlocklistContent;
