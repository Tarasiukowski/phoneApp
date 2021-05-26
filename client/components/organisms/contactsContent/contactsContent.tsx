import { useSelector } from 'react-redux';

import UsersList from '../../molecules/usersList/usersList';

import { selectFriends } from '../../../reducers/friendsReducer';

export const ContactsContent = () => {
  const friends = useSelector(selectFriends);

  return <UsersList name="contacts" data={friends} />;
};
