import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from './header/header';
import { Textarea } from './textarea/textarea';
import Message from './message/message';

import styles from './chat.module.scss';
import { props } from './types';
import { selectUser } from '../../../reducers/userReducer';
import { fetcher } from '../../../utils';

const Chat = ({ messages, user, id, width }: props) => {
  const [valueTextarea, setValueTextarea] = useState('');

  const refMessagesTemplate = useRef<HTMLDivElement>(null);

  const { email } = useSelector(selectUser);

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
        fetcher('PUT', '/conversation/send', {
          email,
          content: valueTextarea,
          id,
        });

        setValueTextarea('');
      }
    },
    onDragEnter: () => {},
    placeholder: 'Write a message...',
  };

  return (
    <div className={styles.template} style={{ width: width ? width : '64.5vw' }}>
      <Header user={user} />
      <div className={styles.messagesTemplate} ref={refMessagesTemplate}>
        <div className={styles.messagesList}>
          {messages.map((message) => (
            <Message {...message} data={messages} key={message.id} />
          ))}
        </div>
      </div>
      <div className={styles.inputTemplate}>
        <Textarea {...inputHandle} />
      </div>
    </div>
  );
};

export { Chat };
