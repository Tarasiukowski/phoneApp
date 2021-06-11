import { useSelector } from 'react-redux';

import { UsersList } from '../../molecules';

import { selectInvites } from '../../../reducers/invitesReducer';

const InvitesContent = () => {
  const invites = useSelector(selectInvites);

  return <UsersList name="invites" data={invites} />;
};

export { InvitesContent };
