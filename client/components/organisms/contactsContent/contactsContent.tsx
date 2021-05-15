import { useSelector } from 'react-redux';

import UsersList from '../../molecules/usersList/usersList';

import { selectFriends } from '../../../reducers/friendsReducer';

const InvitesContent = () => {
  const friends = useSelector(selectFriends);

  return <UsersList name="contacts" data={friends} detailedUser={friends[0]} />;
};

export default InvitesContent;
