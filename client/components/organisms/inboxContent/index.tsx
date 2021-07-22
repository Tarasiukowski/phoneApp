import { useState } from 'react';
import { useRouter } from 'next/router';

import { UserDetailes, Chat } from 'components/molecules';

import { Member } from 'interfaces';
import styles from './inboxContent.module.scss';

const InboxContent = () => {
  const [user, setUser] = useState<Member | null>(null);

  const {
    query: { slug },
  } = useRouter();

  const conversationId = slug[1];

  return (
    <div className={styles.template}>
      <Chat
        id={conversationId}
        getScopedUser={(user) => {
          setUser(user);
        }}
      />
      <UserDetailes loading={!user} email={user?.email} />
    </div>
  );
};

export { InboxContent };
