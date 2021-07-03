import { logout } from 'utils';
import { SingOutSvg, SettingsSvg, PlusSvg } from '../../../../public/svgs';

export const buttonNavigationSettings = {
  size: {
    width: '93%',
  },
};

export const buttonsData = [
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
