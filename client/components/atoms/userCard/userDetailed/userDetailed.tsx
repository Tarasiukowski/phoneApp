import { RefObject } from 'react';

import ButtonNavigation from '../../buttonNavigation/buttonNavigation';
import UserCard from '../userCard';

import styles from './UserDetailed.module.scss';
import { SingOutSvg, SettingsSvg, PlusSvg } from '../../../../public/svgs';

const buttonNavigationSettings = {
  size: {
    width: '93%',
  },
};

const UserDetailed = ({ ref }: { ref: RefObject<HTMLDivElement> }) => (
  <div className={styles.box} ref={ref}>
    <div>
      <UserCard big />
    </div>
    <div className={styles.template}>
      <ButtonNavigation
        href="/settings/profile"
        icon={<SettingsSvg />}
        content="Edit account"
        {...buttonNavigationSettings}
      />
      <ButtonNavigation
        href="/settings/general"
        icon={<SettingsSvg />}
        content="Workspace settings"
        {...buttonNavigationSettings}
      />
      <ButtonNavigation
        icon={<PlusSvg />}
        content="Invite your friends"
        {...buttonNavigationSettings}
      />
      <ButtonNavigation icon={<SingOutSvg />} content="Sing out" {...buttonNavigationSettings} />
    </div>
  </div>
);

export default UserDetailed;
