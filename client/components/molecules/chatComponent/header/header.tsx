import ImageUser from '../../../atoms/imageUser/imageUser';
import ChatOptions from '../chatOptions/chatOptions';

import styles from './header.module.scss';

const Header = () => (
  <div className={styles.header}>
    <ImageUser />
    <p className={styles.name}>Michał Tarasiuk</p>
    <ChatOptions />
  </div>
);

export default Header;
