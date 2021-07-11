import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import UserCard from './userCard';
import { Button } from './button';

import { useFriends } from 'setup/reducers/friendsReducer';
import { useUser } from 'setup/reducers/userReducer';
import styles from './navigation.module.scss';

const Navigation = () => {
  const user = useUser();
  const friends = useFriends();
  const router = useRouter();

  const {
    query: { slug },
  } = router;

  const { groups = [], conversations = [] } = user || {};

  const slugId = slug[1];
  const findedGroup = groups.find((group) => group._id === slugId);

  const getConversationId = (email: string) =>
    conversations.find((conversation) => conversation.with === email)?.id;

  useEffect(() => {
    if (findedGroup) {
      const firstMemberOfGroup = findedGroup.members[0];

      router.push(`/group/${slugId}/${getConversationId(firstMemberOfGroup)}`);
    }
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
