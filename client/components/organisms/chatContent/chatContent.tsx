import UserDetailed from '../../molecules/userDetailed/userDetailed';
import Chat from '../../molecules/chatComponent/chat';

import styles from './chatContent.module.scss';

const ChatContent = () => (
  <div className={styles.template}>
    <Chat messages={[]} />
    <UserDetailed
      loading={true}
      fullname={{ firstname: 'Michał', lastname: 'Tarasiuk' }}
      number="987-8769"
      email="tarasiuk.michal03@gmail.com"
      image="https://lh3.googleusercontent.com/a-/AOh14GiGYJ6P_vuD4eWU4wi65J4z0FprFvtNLgdYmF4E=s96-c"
    />
  </div>
);

export default ChatContent;
