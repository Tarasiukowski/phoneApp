import ImageUser from '../../../atoms/imageUser/imageUser';
import ChatOptions from '../chatOptions/chatOptions';

import { props } from './types';
import styles from './header.module.scss';

const Header = ({ user }: props) => {
  return (
    <div className={styles.header}>
      {user ? (
        <>
          {(() => {
            const {
              fullname: { firstname, lastname },
            } = user;

            return (
              <>
                <ImageUser member={user} />
                <p className={styles.name}>
                  {firstname} {lastname}
                </p>
                <ChatOptions />
              </>
            );
          })()}
        </>
      ) : null}
    </div>
  );
};

export default Header;
