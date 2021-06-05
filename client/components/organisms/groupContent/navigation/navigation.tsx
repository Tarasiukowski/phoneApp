import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import UserCard from './userCard/userCard';
import { Button } from './button/button';

import { selectFriends } from '../../../../reducers/friendsReducer';
import { selectUser } from '../../../../reducers/userReducer';
import styles from './navigation.module.scss';

const Navigation = () => {
  const { groups, conversations } = useSelector(selectUser);
  const friends = useSelector(selectFriends);

  const router = useRouter();

  const {
    query: { slug },
  } = router;

  const slugId = slug[1];
  const findedGroup = groups.find((group) => group._id === slugId);
  const firstEmail = findedGroup?.members[0] as string;

  const getConversationId = (email: string) => {
    return conversations.find((conversation) => conversation.with === email)?.id;
  };

  useEffect(() => {
    router.push(`/group/${slugId}/${getConversationId(firstEmail)}`);
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
