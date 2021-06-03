import { useSelector } from 'react-redux';

import { UsersList } from '../../molecules';

import { selectFriends } from '../../../reducers/friendsReducer';

const ContactsContent = () => {
  const friends = useSelector(selectFriends);

  return <UsersList name="contacts" data={friends} />;
};

export { ContactsContent };
