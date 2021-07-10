import { UsersList } from 'components/molecules';

import { ListType } from 'components/molecules/usersList/types';
import { useInvites } from 'setup/reducers/invitesReducer';

const InvitesContent = () => {
  const invites = useInvites();

  return <UsersList name={ListType.invites} data={invites} />;
};

export { InvitesContent };
