import ButtonNavigation from '../../atoms/buttonNavigation/buttonNavigation';

import {
  AccountProfileSvg,
  ContactSettingsSvg,
  BlockListSvg,
  GeneralSvg,
  MembersSvg,
  PhoneNumberSvg,
} from '../../../public/svgs';
import styles from './settingsNavigation.module.scss';

const buttonNavigationSettings = {
  size: {
    width: '86%',
    height: '33px',
  },
  iconSettings: {
    marginLeft: '20px',
  },
};

const SettingsNavigation = () => (
  <div className={styles.box}>
    <p className={styles.heading}>Account</p>
    <div className={styles.template}>
      <ButtonNavigation
        href="/settings/profile"
        icon={<AccountProfileSvg />}
        content="Account & Profile"
        {...buttonNavigationSettings}
      />
      <ButtonNavigation
        href="/settings/members"
        icon={<MembersSvg />}
        content="Friends List"
        {...buttonNavigationSettings}
      />
      <ButtonNavigation
        href="/settings/manageLists"
        icon={<ContactSettingsSvg />}
        content="Manage Lists"
        {...buttonNavigationSettings}
      />
      <ButtonNavigation
        href="/settings/blocklist"
        icon={<BlockListSvg />}
        content="Blocklist"
        {...buttonNavigationSettings}
      />
    </div>
    <p className={styles.heading}>Workspace</p>
    <div className={styles.template}>
      <ButtonNavigation
        href="/settings/general"
        icon={<GeneralSvg />}
        content="General"
        {...buttonNavigationSettings}
      />
      <ButtonNavigation
        href="/settings/numbers"
        icon={<PhoneNumberSvg />}
        content="Phone Numbers"
        {...buttonNavigationSettings}
      />
    </div>
  </div>
);

export default SettingsNavigation;
