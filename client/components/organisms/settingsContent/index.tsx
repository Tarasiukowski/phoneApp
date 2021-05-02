import SettingsNavigation from '../../molecules/settingsNavigation/settingsNavigation';
import Subpage from '../subpage/subpage';
import SettingsFriendsContent from './friends/friends';
import SettingsProfileContent from './profile/profile';
import SettingsGeneralContent from './general/general';
import SettingsBlocklistContent from './blocklist/blocklist';
import SettingsContactContent from './contacts/contacts';

const routes = [
  {
    slug: 'friends',
    component: SettingsFriendsContent,
  },
  {
    slug: 'profile',
    component: SettingsProfileContent,
  },
  {
    slug: 'general',
    component: SettingsGeneralContent,
  },
  {
    slug: 'blocklist',
    component: SettingsBlocklistContent,
  },
  {
    slug: 'contacts',
    component: SettingsContactContent,
  },
];

const SettingsContent = () => (
  <>
    <SettingsNavigation />
    <Subpage routes={routes} slugNumber={1} />
  </>
);

export default SettingsContent;
