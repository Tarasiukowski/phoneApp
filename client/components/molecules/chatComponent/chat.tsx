import Header from './header/header';
import { Textarea } from './textarea/textarea';
import Message from './message/message';

import styles from './chat.module.scss';
import { props } from './types'

const Chat = ({ messages }: props) => (
  <div className={styles.template}>
    <Header />
    <div className={styles.content}>
      {messages.map((message) => (
        <Message {...message} messagesData={messages} />
      ))}
    </div>
    <div className={styles.inputTemplate}>
      <Textarea placeholder="Write a message..." />
    </div>
  </div>
);

export default Chat;
