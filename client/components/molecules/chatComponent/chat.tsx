import ImageUser from '../../atoms/imageUser/imageUser';
import ChatOptions from './chatOptions/chatOptions';

import styles from './chat.module.scss';

const Chat = () => (
  <div className={styles.template}>
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <ImageUser />
        <p className={styles.name}>Michał Tarasiuk</p>
        <ChatOptions />
      </div>
    </div>
    <div className={styles.content}></div>
  </div>
);

export default Chat;
