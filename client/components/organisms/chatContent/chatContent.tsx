import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import UserDetailed from '../../molecules/userDetailed/userDetailed';
import Chat from '../../molecules/chatComponent/chat';

import styles from './chatContent.module.scss';
import { ChatData } from './types';
import { fetcher } from '../../../utils';
import { selectUser } from '../../../reducers/userReducer';
import { selectFriends } from '../../../reducers/friendsReducer';
import { User } from '../../../interfaces';

const ChatContent = () => {
  const [dataChat, setDataChat] = useState<ChatData>({ user: null, messages: [] });

  const friends = useSelector(selectFriends);

  const {
    query: { slug },
  } = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    fetcher('POST', 'conversation', {
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
  }, []);

  const { messages, user: member } = dataChat;

  return (
    <div className={styles.template}>
      <Chat messages={messages} />
      <UserDetailed loading={!member} {...member} />
    </div>
  );
};

export default ChatContent;
