import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Header from './header/header';
import { Textarea } from './textarea/textarea';
import Message from './message/message';

import styles from './chat.module.scss';
import { props } from './types';
import { selectUser } from '../../../reducers/userReducer';
import { fetcher } from '../../../utils';
// import { fetcher } from '../../../utils';

const Chat = ({ messages }: props) => {
  const [valueTextarea, setValueTextarea] = useState<string>('');

  const refMessagesTemplate = useRef<HTMLDivElement>(null);

  const { email } = useSelector(selectUser);

  const {
    query: { slug },
  } = useRouter();

  useEffect(() => {
    const messagesTemplate = refMessagesTemplate.current;

    messagesTemplate?.scrollTo(0, messagesTemplate.scrollHeight);
  });

  const inputHandle = {
    value: valueTextarea,
    onChange: (e: ChangeEvent) => {
      const target = e.target as HTMLTextAreaElement;

      setValueTextarea(target.value);
    },
    onKeyUp: (e: any) => {
      if (e.key === 'Enter' && valueTextarea.length) {
        fetcher('PUT', 'conversation/send', {
          email,
          content: valueTextarea,
          id: slug[1],
        });

        setValueTextarea('');
      }
    },
    onDragEnter: () => {},
    placeholder: 'Write a message...',
  };

  return (
    <div className={styles.template}>
      <Header />
      <div className={styles.messagesTemplate} ref={refMessagesTemplate}>
        {messages.map((message) => (
          <Message {...message} data={messages} key={message.id} />
        ))}
      </div>
      <div className={styles.inputTemplate}>
        <Textarea {...inputHandle} />
      </div>
    </div>
  );
};

export default Chat;
