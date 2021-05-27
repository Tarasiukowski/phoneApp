import { forwardRef } from 'react';

import styles from './elementList.module.scss';

const ElementList = forwardRef<HTMLDivElement, any>(({ onClick }, ref) => (
  <div onClick={onClick} className={styles.box} ref={ref}>
    <div className={styles.image}>
      <span>🚌</span>
    </div>
    <p>Primary</p>
  </div>
));

export default ElementList;
