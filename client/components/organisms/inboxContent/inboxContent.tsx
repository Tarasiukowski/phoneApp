import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import UserDetailed from '../../molecules/userDetailed/userDetailed';
import Chat from '../../molecules/chatComponent/chat';

import { ChatData } from './types';
import { fetcher } from '../../../utils';
import { selectUser } from '../../../reducers/userReducer';
import { selectFriends } from '../../../reducers/friendsReducer';
import { User } from '../../../interfaces';
import styles from './inboxContent.module.scss';

export const InboxContent = () => {
  const [dataChat, setDataChat] = useState<ChatData>({ user: null, messages: [] });

  const friends = useSelector(selectFriends);
  const user = useSelector(selectUser);

  const {
    query: { slug },
  } = useRouter();

  const getDataChat = (url: string) => {
    fetcher('POST', url, {
      email: user.email,
      id: slug[1],
    }).then((data) => {
      const { email, messages } = data;

      const friend = friends.find((friend) => {
        if (friend.email === email) {
          return friend;
        }
      }) as User;

      setDataChat({ messages, user: friend });
    });
  };

  getDataChat('/conversation');

  const { messages, user: member } = dataChat;

  return (
    <div className={styles.template}>
      <Chat messages={messages} />
      <UserDetailed loading={!member} {...member} />
    </div>
  );
};
