import { useSelector } from 'react-redux';

import UsersList from '../../molecules/usersList/usersList';

import { selectInvites } from '../../../reducers/invitesReducer';

export const InvitesContent = () => {
  const invites = useSelector(selectInvites);

  return <UsersList name="invites" data={invites} />;
};
