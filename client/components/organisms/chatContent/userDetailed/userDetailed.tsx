import { Button } from '../../../atoms/button/button';
import ImageUser from '../../../atoms/imageUser/imageUser';
import DetailedChatUserList from '../../../molecules/detailedChatUserList/detailedChatUset';

import styles from './userDetailed.module.scss';
import { MailSvg, MoreSvg } from '../../../../public/svgs';
import { props } from './types';
import { keysToArray } from '../../../../utils/keysToArray';

const UserDetailed = ({ firstname, lastname, color, image, ...restProps }: props) => {
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <ImageUser
          image={image}
          fullname={firstname && lastname ? { firstname, lastname } : undefined}
          colorImage={color}
          size="80px"
          fontSize="2.5rem"
        />
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
      <DetailedChatUserList list={keysToArray(restProps)} />
    </div>
  );
};

export default UserDetailed;
