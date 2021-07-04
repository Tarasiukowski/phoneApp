import { Subpage, SettingsNavigation } from 'components/molecules';
import {
  SettingsFriendsContent,
  SettingsBlocklistContent,
  SettingsListsContent,
  SettingsProfileContent,
  SettingsNumberContent,
} from './index';

const SettingsContent = () => (
  <>
    <SettingsNavigation />
    <Subpage routes={routes} slugNumber={1} />
  </>
);

const routes = [
  {
    slug: 'profile',
    component: <SettingsProfileContent />,
  },
  {
    slug: 'blocklist',
    component: <SettingsBlocklistContent />,
  },
  {
    slug: 'manageLists',
    component: <SettingsListsContent />,
  },
  {
    slug: 'members',
    component: <SettingsFriendsContent />,
  },
  {
    slug: 'number',
    component: <SettingsNumberContent />,
  },
];

export { SettingsContent };
