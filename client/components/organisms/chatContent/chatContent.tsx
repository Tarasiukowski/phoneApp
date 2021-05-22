import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import UserDetailed from '../../molecules/userDetailed/userDetailed';
import Chat from '../../molecules/chatComponent/chat';

import styles from './chatContent.module.scss';
import { ChatData } from './types';
import { fetcher } from '../../../utils';
import { selectUser } from '../../../reducers/userReducer';

const ChatContent = () => {
  const [dataChat, setDataChat] = useState<ChatData>({ user: null, messages: [] });

  const {
    query: { slug },
  } = useRouter();
  const user = useSelector(selectUser);

  useEffect(() => {
    fetcher('POST', 'conversation', {
      email: user.email,
      id: slug[1],
    }).then((data) => {
      setDataChat(data);
    });
  }, []);

  const { messages, user: member } = dataChat;

  return (
    <div className={styles.template}>
      <Chat
        messages={messages}
      />
      <UserDetailed loading={!member} {...member} />
    </div>
  );
};

export default ChatContent;
