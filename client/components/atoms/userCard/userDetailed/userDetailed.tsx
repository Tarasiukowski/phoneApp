import ButtonNavigation from '../../buttonNavigation/buttonNavigation';
import UserCard from '../userCard';

import styles from './UserDetailed.module.scss';
import { props } from './types';
import { logout } from '../../../../utils'
import { SingOutSvg, SettingsSvg, PlusSvg } from '../../../../public/svgs';

const UserDetailed = ({ userDetailedRef }: props) => (
  <div className={styles.box} ref={userDetailedRef}>
    <div>
      <UserCard big />
    </div>
    <div className={styles.template}>
      {buttonsData.map((data) => (
        <ButtonNavigation key={data.content} {...data} {...buttonNavigationSettings} />
      ))}
    </div>
  </div>
);

const buttonNavigationSettings = {
  size: {
    width: '93%',
  },
};

const buttonsData = [
  {
    href: '/settings/profile',
    icon: SettingsSvg,
    content: 'Edit account',
  },
  {
    href: '/settings/general',
    icon: SettingsSvg,
    content: 'Workspace settings',
  },
  {
    icon: PlusSvg,
    content: 'Invite your friends',
  },
  {
    icon: SingOutSvg,
    content: 'Sing out',
    onClick: logout,
  },
];

export default UserDetailed;
