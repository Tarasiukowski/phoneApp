import SettingsNavigation from '../../molecules/settingsNavigation/settingsNavigation';
import SettingsGeneralContent from './general/general';
// import SettingsBlocklistContent from './blocklist/blocklist';
// import SettingsContactContent from './contacts/contacts';
// import SettingsProfileContent from './profile/profile';

const SettingsContent = () => (
  <>
    <SettingsNavigation />
    <SettingsGeneralContent />
    {/* <SettingsProfileContent /> */}
    {/* <SettingsContactContent /> */}
    {/* <SettingsBlocklistContent /> */}
  </>
);

export default SettingsContent;
