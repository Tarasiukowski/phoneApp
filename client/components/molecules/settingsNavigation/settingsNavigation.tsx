import ButtonNavigation from '../../atoms/buttonNavigation/buttonNavigation';

import { buttonsNavigationData, buttonNavigationSettings } from './data';
import styles from './settingsNavigation.module.scss';

const SettingsNavigation = () => (
  <div className={styles.box}>
    <p className={styles.heading}>Account</p>
    <div className={styles.template}>
      {buttonsNavigationData.workspace.map((dataButton) => (
        <ButtonNavigation {...dataButton} {...buttonNavigationSettings} key={dataButton.content} />
      ))}
    </div>
    <p className={styles.heading}>Workspace</p>
    <div className={styles.template}>
      {buttonsNavigationData.workspace.map((dataButton) => (
        <ButtonNavigation {...dataButton} {...buttonNavigationSettings} key={dataButton.content} />
      ))}
    </div>
  </div>
);

export default SettingsNavigation;
