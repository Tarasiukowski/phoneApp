import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import UserCard from './userCard';
import { Button } from './button';

import { useFriends, useUser } from 'hooks';
import styles from './navigation.module.scss';

const Navigation = () => {
  const user = useUser();
  const friends = useFriends();
  const router = useRouter();

  const {
    query: { slug },
  } = router;

  const slugId = slug[1];
  const findedGroup = user?.groups.find((group) => group._id === slugId);
  const firstMemberOfGroup = findedGroup?.members[0] as string;

  const getConversationId = (email: string) =>
    user?.conversations.find((conversation) => conversation.with === email)?.id;

  useEffect(() => {
    router.push(`/group/${slugId}/${getConversationId(firstMemberOfGroup)}`);
  }, []);

  return (
    <div className={styles.template}>
      <div className={styles.header}>
        <Button active={true}>Open</Button>
        <Button active={false} filter style={{ marginLeft: '10px' }}>
          Unread
        </Button>
      </div>
      <div className={styles.content}>
        {findedGroup?.members.map((email) => {
          const friend = friends.find((friend) => friend.email === email);
          const conversationId = getConversationId(email);

          return (
            <Link
              href={`/group/${slugId}/${conversationId}`}
              children={<UserCard member={friend} />}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
