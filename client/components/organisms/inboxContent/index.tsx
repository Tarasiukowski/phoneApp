import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { UserDetailed, Chat } from '../../molecules';

import { ChatData } from './types';
import { fetcher } from '../../../utils';
import { selectFriends } from '../../../reducers/friendsReducer';
import { User } from '../../../interfaces';
import styles from './inboxContent.module.scss';

const InboxContent = () => {
  const [dataChat, setDataChat] = useState<ChatData>({ user: null, messages: [] });

  const friends = useSelector(selectFriends);

  const {
    query: { slug },
  } = useRouter();

  const conversationId = slug[1];

  const fetchDataChat = async (url: string) => {
    const { conversation } = await fetcher('POST', url, {
      id: conversationId,
    });

    const { email, messages } = conversation;

    const friend = friends.find((friend) => {
      if (friend.email === email) {
        return friend;
      }
    }) as User;

    setDataChat({ messages, user: friend });
  };

  fetchDataChat('/conversation');

  const { user: member } = dataChat;

  return (
    <div className={styles.template}>
      <Chat {...dataChat} id={conversationId} />
      <UserDetailed loading={!member} {...member} />
    </div>
  );
};

export { InboxContent };
