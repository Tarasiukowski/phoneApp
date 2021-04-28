import SettingsNavigation from '../../molecules/settingsNavigation/settingsNavigation';
import SettingsContactContent from './contacts/contacts';
// import SettingsProfileContent from './profile/profile';

const SettingsContent = () => (
  <>
    <SettingsNavigation />
    {/* <SettingsProfileContent /> */}
    <SettingsContactContent />
  </>
);

export default SettingsContent;
