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

const SettingsNavigation = () => {
  const buttonNavigationSettings = {
    size: {
      width: '86%',
      height: '35px',
    },
    iconSettings: {
      marginLeft: "20px"
    }
  };

  return (
    <div className={styles.box}>
      <p className={styles.heading}>Account</p>
      <div className={styles.template}>
        <ButtonNavigation
          icon={<AccountProfileSvg />}
          content="Account & Profile"
          {...buttonNavigationSettings}
        />
        <ButtonNavigation
          icon={<ContactSettingsSvg />}
          content="Contacts"
          {...buttonNavigationSettings}
        />
        <ButtonNavigation
          icon={<BlockListSvg />}
          content="Blocklist"
          {...buttonNavigationSettings}
        />
      </div>
      <p className={styles.heading}>Workspace</p>
      <div className={styles.template}>
        <ButtonNavigation icon={<GeneralSvg />} content="General" {...buttonNavigationSettings} />
        <ButtonNavigation icon={<MembersSvg />} content="Members" {...buttonNavigationSettings} />
        <ButtonNavigation
          icon={<PhoneNumberSvg />}
          content="Phone Numbers"
          {...buttonNavigationSettings}
        />
      </div>
    </div>
  );
};

export default SettingsNavigation;
