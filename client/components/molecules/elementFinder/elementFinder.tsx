import { Input } from '../../atoms/input/input';

import styles from './ElementFinder.module.scss';

const ElementFinder: React.FC = ({ children }) => (
  <div className={styles.template}>
    <div className={styles.inputTemplate}>
      <Input placeholder="Select for a number" autoComplete="off" />
    </div>
    <div className={styles.list}>{children}</div>
  </div>
);

export default ElementFinder;
