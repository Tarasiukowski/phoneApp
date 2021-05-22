import ContactsContent from '../components/organisms/contactsContent/contactsContent';
import InvitesContent from '../components/organisms/invitesContent/invitesContent';
import SettingsContent from '../components/organisms/settingsContent';
import Subpage from '../components/molecules/subpage/subpage'
import IsLoggedTemplate from '../templates/isLoggedTemplate/isLoggedTemplate';
import MainTemplate from '../templates/mainTemplate/mainTemplate';
import ChatContent from '../components/organisms/chatContent/chatContent';

const MainPage = () => (
  <IsLoggedTemplate allow="logged">
    <MainTemplate>
      <Subpage routes={routes} slugNumber={0} />
    </MainTemplate>
  </IsLoggedTemplate>
);

const routes = [
  {
    slug: 'settings',
    component: <SettingsContent />
  },
  {
    slug: 'inbox',
    component: <ChatContent />
  },
  {
    slug: 'contacts',
    component: <ContactsContent />,
  },
  {
    slug: 'invites',
    component: <InvitesContent />
  }
];

export default MainPage;
