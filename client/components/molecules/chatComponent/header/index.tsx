import { ImageUser } from '../../../atoms';
import ChatOptions from '../chatOptions/index';

import { props } from './types';
import styles from './header.module.scss';

const Header = ({ user }: props) => {
  return (
    <div className={styles.header}>
      {user && (
        <>
          {(() => {
            const { fullname } = user;

            const formatedFullname = Object.values(fullname).join(' ');

            return (
              <>
                <ImageUser member={user} />
                <p className={styles.name}>{formatedFullname}</p>
                <ChatOptions />
              </>
            );
          })()}
        </>
      )}
    </div>
  );
};

export default Header;
