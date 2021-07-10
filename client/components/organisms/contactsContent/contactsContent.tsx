import { UsersList } from 'components/molecules';

import { ListType } from 'components/molecules/usersList/types';
import { useFriends } from 'setup/reducers/friendsReducer';

const ContactsContent = () => {
  const friends = useFriends();

  return <UsersList name={ListType.contacts} data={friends} />;
};

export { ContactsContent };
