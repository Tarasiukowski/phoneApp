import { ImageUser } from 'components/atoms';
import ChatOptions from '../chatOptions/index';

import { props } from './types';
import { formatValuesObject } from 'utils';
import styles from './header.module.scss';

const Header = ({ user }: props) => {
  if (user) {
    const { fullname } = user;

    const formatedFullname = formatValuesObject(fullname);

    return (
      <div className={styles.template}>
        <ImageUser member={user} />
        <p className={styles.name}>{formatedFullname}</p>
        <ChatOptions />
      </div>
    );
  }

  return <div className={styles.template}></div>;
};

export default Header;
