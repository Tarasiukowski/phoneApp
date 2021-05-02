import ImageUser from '../imageUser/imageUser';
import styles from './activeUser.module.scss';

const ActiveUser = () => (
  <div className={styles.template}>
    <ImageUser mini />
    <p>Michał Tarasiuk</p>
  </div>
);

export default ActiveUser;
