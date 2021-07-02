import { UsersList } from '../../molecules';

import { useFriends } from '../../../hooks';

const ContactsContent = () => {
  const friends = useFriends();

  return <UsersList name="contacts" data={friends} />;
};

export { ContactsContent };
