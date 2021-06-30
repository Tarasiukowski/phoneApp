import { forwardRef } from 'react';

import { ImageUser } from '../../../../atoms';

import { props } from './types';
import styles from './userCard.module.scss';

const UserCard = forwardRef<HTMLDivElement, props>(({ member, onClick }, ref) => {
  if (member) {
    const { fullname } = member;

    const formatedFullname = Object.values(fullname).join(' ');

    return (
      <div onClick={onClick} className={styles.box} ref={ref}>
        <ImageUser member={member} extraStyle={{ size: '45px', fontSize: '14px' }} />
        <div className={styles.content}>
          <p className={styles.name}>{formatedFullname}</p>
          <p className={styles.msg}>Some text msg</p>
        </div>
      </div>
    );
  }

  return null;
});

export default UserCard;
