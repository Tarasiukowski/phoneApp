import { Subpage, SettingsNavigation } from '../../molecules';
import {
  SettingsFriendsContent,
  SettingsBlocklistContent,
  SettingsListsContent,
  SettingsProfileContent,
  SettingsGeneralContent,
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
    slug: 'general',
    component: <SettingsGeneralContent />,
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
];

export { SettingsContent };
