import { useState } from 'react';
import { useRouter } from 'next/router';

import { Chat, UserDetailed } from '../../molecules';
import Navigation from './navigation';

import { Member } from '../../../interfaces';

const GroupContent = () => {
  const [user, setUser] = useState<Member | null>(null);

  const router = useRouter();

  const {
    query: { slug },
  } = router;

  const conversationId = slug[2];

  return (
    <>
      <Navigation />
      <Chat
        id={conversationId}
        width="42.1vw"
        getScopedUser={(user) => {
          setUser(user);
        }}
      />
      <UserDetailed loading={!user} {...user} />
    </>
  );
};

export { GroupContent };
