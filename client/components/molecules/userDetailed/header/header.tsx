import { useSelector } from 'react-redux';

import { Button, ImageUser } from '../../../atoms';

import { MailSvg, MoreSvg } from '../../../../public/svgs';
import { props } from './types';
import styles from './header.module.scss';
import { selectUser } from '../../../../reducers/userReducer';

const Header = (props: props) => {
  const { fullname } = useSelector(selectUser);

  const { firstname, lastname } = props.fullname ? props.fullname : fullname;

  return (
    <div className={styles.header}>
      <ImageUser member={props} size="80px" fontSize="2.5rem" />
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
  );
};

export default Header;
