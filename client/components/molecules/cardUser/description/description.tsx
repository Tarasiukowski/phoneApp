import { FaPhoneAlt } from 'react-icons/fa';
import styles from './description.module.scss';

const Description = () => (
  <div className={styles.template}>
    <ul>
      <li>
        <div className={styles.key}>
          <FaPhoneAlt size="13" /> <p>Email</p>
        </div>
        <div className={styles.value}>
          <p>tarasiuk.michal03@gmail.com</p>
        </div>
      </li>
      <li>
        <div className={styles.key}>
          <FaPhoneAlt size="13" /> <p>Phone</p>
        </div>
        <div className={styles.value}>
          <p>932-3209</p>
        </div>
      </li>
    </ul>
  </div>
);

export default Description;
