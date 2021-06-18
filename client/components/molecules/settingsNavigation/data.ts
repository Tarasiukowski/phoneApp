import { ButtonsNavigationData } from './types';
import {
  AccountProfileSvg,
  ContactSettingsSvg,
  BlockListSvg,
  GeneralSvg,
  MembersSvg,
  PhoneNumberSvg,
} from '../../../public/svgs';

export const buttonNavigationSettings = {
  size: {
    width: '86%',
    height: '33px',
  },
  iconSettings: {
    marginLeft: '20px',
  },
};

export const buttonsNavigationData: ButtonsNavigationData = {
  account: [
    {
      href: '/settings/profile',
      icon: AccountProfileSvg,
      content: 'Account & Profile',
    },
    ,
    {
      href: '/settings/members',
      icon: MembersSvg,
      content: 'Friends List',
    },
    {
      href: '/settings/manageLists',
      icon: ContactSettingsSvg,
      content: 'Manage Lists',
    },
    {
      href: '/settings/blocklist',
      icon: BlockListSvg,
      content: 'Blocklist',
    },
  ],
  workspace: [
    {
      href: '/settings/general',
      icon: GeneralSvg,
      content: 'General',
    },
    {
      href: '/settings/number',
      icon: PhoneNumberSvg,
      content: 'Phone Number',
    },
  ],
};
