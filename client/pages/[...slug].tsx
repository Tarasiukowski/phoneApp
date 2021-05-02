import ChatContent from '../components/organisms/chatContent/chatContent';
import SettingsContent from '../components/organisms/settingsContent';
import Subpage from '../components/organisms/subpage/subpage';
import MainTemplate from '../templates/mainTemplate/mainTemplate';

const routes = [
  {
    slug: "settings",
    component: SettingsContent
  },
  {
    slug: "chat",
    component: ChatContent
  }
]

const MainPage = () => (
  <MainTemplate>
    <Subpage routes={routes} slugNumber={0} />
  </MainTemplate>
);

export default MainPage;
