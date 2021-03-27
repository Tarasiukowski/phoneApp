import { BiMessageDetail } from 'react-icons/bi';
import { HiOutlineDotsVertical } from "react-icons/hi";
import styles from './avatar.module.scss';

const Avatar = () => (
  <div className={styles.template}>
    <div className={styles.image}>
      <p>MT</p>
    </div>
    <h3>Michał Tarasiuk</h3>
    <div className={styles.options}>
      <div className={styles.option}>
        <BiMessageDetail />
      </div>
      <div className={styles.option}>
        <HiOutlineDotsVertical />
      </div>
    </div>
  </div>
);

export default Avatar;
