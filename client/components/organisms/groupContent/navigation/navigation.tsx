import UserCard from './userCard/userCard';
import { Button } from './button/button';

import styles from './navigation.module.scss';

const Navigation = () => (
  <div className={styles.template}>
    <div className={styles.header}>
      <Button active={true}>Open</Button>
      <Button active={false} filter style={{ marginLeft: '10px' }}>
        Unread
      </Button>
    </div>
    <div className={styles.content}>
      <UserCard />
    </div>
  </div>
);

export default Navigation;
