import { Button } from '../../../../atoms';

import { props } from './types';
import styles from './elementList.module.scss';

const ElementList = ({ name, onClick }: props) => (
  <div className={styles.elementList}>
    <div className={styles.image}>
      <span>🚌</span>
    </div>
    <p className={styles.name}>{name}</p>
    <Button onClick={onClick} width="auto">
      Remove
    </Button>
  </div>
);

export default ElementList;
