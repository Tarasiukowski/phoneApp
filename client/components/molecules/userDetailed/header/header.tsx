import { Button } from '../../../atoms/button/button';
import ImageUser from '../../../atoms/imageUser/imageUser';

import { MailSvg, MoreSvg } from '../../../../public/svgs';
import { props } from './types'
import styles from './header.module.scss'

const Header = (props: props) => {
  const { firstname, lastname } = props.fullname

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
}

export default Header;
