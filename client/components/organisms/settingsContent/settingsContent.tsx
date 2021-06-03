import {
  SettingsFriendsContent,
  SettingsBlocklistContent,
  SettingsContactContent,
  SettingsProfileContent,
  SettingsGeneralContent,
} from './index';
import SettingsNavigation from '../../molecules/settingsNavigation/settingsNavigation';
import Subpage from '../../molecules/subpage/subpage';

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
    component: <SettingsContactContent />,
  },
  {
    slug: 'members',
    component: <SettingsFriendsContent />,
  },
];

export { SettingsContent };
