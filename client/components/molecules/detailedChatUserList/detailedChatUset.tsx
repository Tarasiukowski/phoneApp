// FIX TYPES

import styles from './detailedChatUser.module.scss';

import { EmailSvg, PhoneNumberSvg } from '../../../public/svgs';

const icons: any = {
  email: <EmailSvg />,
  number: <PhoneNumberSvg />,
};

const DetailedChatUserList = ({ list }: { list: any[] }) => (
  <div className={styles.list}>
    {list.map((listElem) => {
      const key: any = Object.keys(listElem)[0];

      return (
        <div className={styles.listElement}>
          <div>
            {icons[key]}
            <p>{key}</p>
          </div>
          <div>
            <p>{listElem[key]}</p>
          </div>
        </div>
      );
    })}
  </div>
);

export default DetailedChatUserList;
