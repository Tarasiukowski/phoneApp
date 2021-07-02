import { UsersList } from '../../molecules';

import { useInvites } from '../../../hooks';

const InvitesContent = () => {
  const invites = useInvites();

  return <UsersList name="invites" data={invites} />;
};

export { InvitesContent };
