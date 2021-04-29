import SettingsNavigation from '../../molecules/settingsNavigation/settingsNavigation';
// import SettingsProfileContent from './profile/profile';
// import SettingsGeneralContent from './general/general';
// import SettingsBlocklistContent from './blocklist/blocklist';
import SettingsContactContent from './contacts/contacts';

const SettingsContent = () => (
  <>
    <SettingsNavigation />
    <SettingsContactContent />
  </>
);

export default SettingsContent;
