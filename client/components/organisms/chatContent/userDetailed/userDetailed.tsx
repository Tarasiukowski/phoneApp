import { Button } from '../../../atoms/button/button';
import ImageUser from '../../../atoms/imageUser/imageUser';
import DetailedChatUserList from '../../../molecules/detailedChatUserList/detailedChatUset';

import styles from './userDetailed.module.scss';
import { MailSvg, MoreSvg } from '../../../../public/svgs';

const UserDetailed = () => (
  <div className={styles.box}>
    <div className={styles.header}>
      <ImageUser size="80px" fontSize="2.5rem" />
      <p className={styles.name}>Michał Tarasiuk</p>
      <div className={styles.options}>
        <Button width="auto">
          <MailSvg />
        </Button>
        <Button width="auto">
          <MoreSvg />
        </Button>
      </div>
    </div>
    <DetailedChatUserList />
  </div>
);

export default UserDetailed;
