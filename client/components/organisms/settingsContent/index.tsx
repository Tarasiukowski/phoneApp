import SettingsNavigation from '../../molecules/settingsNavigation/settingsNavigation';
import Subpage from '../../molecules/subpage/subpage';
import SettingsFriendsContent from './friends/friends';
import SettingsProfileContent from './profile/profile';
import SettingsGeneralContent from './general/general';
import SettingsBlocklistContent from './blocklist/blocklist';
import SettingsContactContent from './contacts/contacts';

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

export default SettingsContent;
