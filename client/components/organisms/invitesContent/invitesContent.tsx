import { useSelector } from 'react-redux';

import UsersList from '../../molecules/usersList/usersList';

import { selectInvites } from '../../../reducers/invitesReducer';

const InvitesContent = () => {
  const invites = useSelector(selectInvites);

  return <UsersList name="invites" data={invites} detailedUser={invites[0]} />;
};

export default InvitesContent;
