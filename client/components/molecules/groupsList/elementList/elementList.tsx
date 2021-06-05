import { forwardRef } from 'react';

import { props } from './types';
import styles from './elementList.module.scss';

const ElementList = forwardRef<HTMLDivElement, props>(({ onClick, name }, ref) => (
  <div onClick={onClick} className={styles.box} ref={ref}>
    <div className={styles.image}>
      <span>🚌</span>
    </div>
    <p>{name}</p>
  </div>
));

export default ElementList;
