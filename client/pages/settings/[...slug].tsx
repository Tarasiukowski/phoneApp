import { useRouter } from "next/router"
import SettingsNavigation from '../../components/molecules/settingsNavigation/settingsNavigation';
import SettingsProfileContent from "../../components/organisms/settingsContent/profile/profile";
import MainTemplate from '../../templates/mainTemplate/mainTemplate';

const SettingsPage = () => {
  const { query: { slug } } = useRouter()

  console.log(slug)

  return (
    <MainTemplate>
      <SettingsNavigation />
      <SettingsProfileContent />
    </MainTemplate>
  );
};

export default SettingsPage;
