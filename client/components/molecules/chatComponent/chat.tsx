import ImageUser from '../../atoms/imageUser/imageUser';
import ChatOptions from './chatOptions/chatOptions';
import { Textarea } from './textarea/textarea'

import styles from './chat.module.scss';

const Chat = () => (
  <div className={styles.template}>
    <div className={styles.header}>
      <ImageUser />
      <p className={styles.name}>Michał Tarasiuk</p>
      <ChatOptions />
    </div>
    <div className={styles.content}></div>
    <div className={styles.inputTemplate}>
      <Textarea placeholder="Write a message..." />
    </div>
  </div>
);

export default Chat;
