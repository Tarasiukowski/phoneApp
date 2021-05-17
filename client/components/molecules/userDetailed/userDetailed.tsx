import { Button } from '../../atoms/button/button';
import ImageUser from '../../atoms/imageUser/imageUser';
import DetailedChatUserList from '../../molecules/detailedChatUserList/detailedChatUset';

import styles from './userDetailed.module.scss';
import { MailSvg, MoreSvg } from '../../../public/svgs';
import { props } from './types';
import { keysToArray } from '../../../utils/keysToArray';

const UserDetailed = ({ email, number, ...restProps }: props) => {
  if (email) {
    const {
      fullname: { firstname, lastname },
    } = restProps;

    return (
      <div className={styles.box}>
        <div className={styles.header}>
          <ImageUser member={restProps} size="80px" fontSize="2.5rem" />
          <p className={styles.name}>
            {firstname} {lastname}
          </p>
          <div className={styles.options}>
            <Button width="auto">
              <MailSvg />
            </Button>
            <Button width="auto">
              <MoreSvg />
            </Button>
          </div>
        </div>
        <DetailedChatUserList list={keysToArray({ email, number })} />
      </div>
    );
  }

  return <div className={styles.box}></div>;
};

export default UserDetailed;
