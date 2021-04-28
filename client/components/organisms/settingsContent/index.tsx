import SettingsNavigation from '../../molecules/settingsNavigation/settingsNavigation';
import SettingsBlocklistContent from './blocklist/blocklist';
// import SettingsContactContent from './contacts/contacts';
// import SettingsProfileContent from './profile/profile';

const SettingsContent = () => (
  <>
    <SettingsNavigation />
    {/* <SettingsProfileContent /> */}
    {/* <SettingsContactContent /> */}
    <SettingsBlocklistContent />
  </>
);

export default SettingsContent;
