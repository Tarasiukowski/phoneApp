import {
  InboxContent,
  GroupContent,
  ContactsContent,
  InvitesContent,
  SettingsContent,
} from '../components/organisms/index';
import Subpage from '../components/molecules/subpage/subpage';
import { MainTemplate, IsLoggedTemplate } from '../templates';

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
    component: <SettingsContent />,
  },
  {
    slug: 'inbox',
    component: <InboxContent />,
  },
  {
    slug: 'group',
    component: <GroupContent />,
  },
  {
    slug: 'contacts',
    component: <ContactsContent />,
  },
  {
    slug: 'invites',
    component: <InvitesContent />,
  },
];

export default MainPage;
