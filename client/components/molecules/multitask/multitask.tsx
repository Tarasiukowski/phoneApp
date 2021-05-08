import { Button } from '../../atoms/button/button';

import styles from './multitask.module.scss';

const Multitask = () => (
  <div className={styles.template}>
    <div className={styles.box}>
      <div className={styles.header}>
        <h4>Invite a friend</h4>
        <p>Add your friend to friend list.</p>
      </div>
      <div className={styles.inputTemplate}>
        <input placeholder="Enter an email adress" autoComplete="off" />
      </div>
      <div className={styles.footer}>
        <Button disabled={true} width="auto">
          Send
        </Button>
      </div>
    </div>
  </div>
);

export default Multitask;
