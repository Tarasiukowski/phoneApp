import SettingsNavigation from '../../molecules/settingsNavigation/settingsNavigation';
import SettingsFriendsContent from './friends/friends';
// import SettingsProfileContent from './profile/profile';
// import SettingsGeneralContent from './general/general';
// import SettingsBlocklistContent from './blocklist/blocklist';
// import SettingsContactContent from './contacts/contacts';

const SettingsContent = () => (
  <>
    <SettingsNavigation />
    <SettingsFriendsContent />
  </>
);

export default SettingsContent;
