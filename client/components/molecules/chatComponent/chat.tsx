import Header from './header/header';
import { Textarea } from './textarea/textarea';

import styles from './chat.module.scss';

const Chat = () => (
  <div className={styles.template}>
    <Header />
    <div className={styles.content}>
      
    </div>
    <div className={styles.inputTemplate}>
      <Textarea placeholder="Write a message..." />
    </div>
  </div>
);

export default Chat;
