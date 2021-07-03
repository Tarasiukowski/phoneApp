import { UsersList } from 'components/molecules';

import { useFriends } from 'hooks';

const ContactsContent = () => {
  const friends = useFriends();

  return <UsersList name="contacts" data={friends} />;
};

export { ContactsContent };
