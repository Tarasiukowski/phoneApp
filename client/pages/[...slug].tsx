import { Subpage } from 'components/molecules';
import {
  InboxContent,
  GroupContent,
  ContactsContent,
  InvitesContent,
  SettingsContent,
} from 'components/organisms/index';
import { MainTemplate, AuthGuardTemplate } from 'templates';

import { Allow } from 'interfaces';

const MainPage = () => (
  <AuthGuardTemplate allow={Allow.logged}>
    <MainTemplate>
      <Subpage routes={routes} slugNumber={0} />
    </MainTemplate>
  </AuthGuardTemplate>
);

const routes = [
  {
    slug: 'settings',
    component: SettingsContent,
  },
  {
    slug: 'inbox',
    component: InboxContent,
  },
  {
    slug: 'group',
    component: GroupContent,
  },
  {
    slug: 'contacts',
    component: ContactsContent,
  },
  {
    slug: 'invites',
    component: InvitesContent,
  },
];

export default MainPage;
