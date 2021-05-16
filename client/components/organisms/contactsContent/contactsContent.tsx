import { useSelector } from 'react-redux';

import UsersList from '../../molecules/usersList/usersList';

import { selectFriends } from '../../../reducers/friendsReducer';

const ContactsContent = () => {
  const friends = useSelector(selectFriends);

  return <UsersList name="contacts" data={friends} defaultDetailedUser={friends[0]} />;
};

export default ContactsContent;
