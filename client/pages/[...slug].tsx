import ChatContent from '../components/organisms/chatContent/chatContent';
import ContactsContent from '../components/organisms/contactsContent/contactsContent';
import SettingsContent from '../components/organisms/settingsContent';
import Subpage from '../components/organisms/subpage/subpage';
import IsLoggedTemplate from '../templates/isLoggedTemplate/isLoggedTemplate';
import MainTemplate from '../templates/mainTemplate/mainTemplate';

const routes = [
  {
    slug: 'settings',
    component: <SettingsContent />,
  },
  {
    slug: 'chat',
    component: <ChatContent />,
  },
  {
    slug: 'contacts',
    component: <ContactsContent />,
  },
];

const MainPage = () => (
  <IsLoggedTemplate allow="logged">
    <MainTemplate>
      <Subpage routes={routes} slugNumber={0} />
    </MainTemplate>
  </IsLoggedTemplate>
);

export default MainPage;
