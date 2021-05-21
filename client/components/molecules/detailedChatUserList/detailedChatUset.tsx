import { ReactNode } from 'react';

import styles from './detailedChatUser.module.scss';

import { EmailSvg, PhoneNumberSvg } from '../../../public/svgs';

type ListElem = {
  email: ReactNode;
  number: ReactNode;
};

const icons = {
  email: <EmailSvg />,
  number: <PhoneNumberSvg />,
};

const DetailedChatUserList = ({ list }: { list: ListElem[] }) => (
  <div className={styles.list}>
    {list.map((listElem, index) => {
      const keys: any[] = Object.keys(listElem);
      const key: 'email' | 'number' = keys[0];

      return (
        <div className={styles.listElement} key={index}>
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
