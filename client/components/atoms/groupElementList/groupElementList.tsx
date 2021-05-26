import { forwardRef } from 'react';

import styles from './groupElementList.module.scss';

const GroupElementList = forwardRef<HTMLDivElement, any>(({ onClick }, ref) => (
  <div onClick={onClick} className={styles.box} ref={ref}>
    <div className={styles.image}>
      <span>🚌</span>
    </div>
    <p>Primary</p>
  </div>
));

export default GroupElementList;
