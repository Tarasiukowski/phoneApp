import { Button, UserCard } from '../../../../atoms';

import { props } from './types'
import styles from './elementList.module.scss';

const ElementList = ({ user, onClick }: props) => (
  <div className={styles.elementList}>
    <UserCard member={user} big />
    <Button onClick={() => onClick(user)} width="auto">Remove</Button>
  </div>
);

export default ElementList;
