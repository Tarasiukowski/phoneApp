import UserCard from '../../atoms/userCard/userCard';
import styles from './navigation.module.scss';

const Navigation = () => (
  <div className={styles.box}>
    <div>
      <UserCard />
    </div>
    <div></div>
  </div>
);

export default Navigation;
