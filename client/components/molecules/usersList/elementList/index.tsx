import { UserCard } from 'components/atoms';

import { PlusSvg } from '../../../../public/svgs';
import { props } from './types';
import { ListType } from '../types';
import styles from './elementList.module.scss';

const ElementList = ({ name, user, onClick, onAcceptInvite }: props) => {
  const isTypeInvites = name === ListType.invites;

  return (
    <div onClick={() => onClick(user)} className={styles.listElement}>
      <UserCard member={user} />
      {isTypeInvites && (
        <div onClick={() => onAcceptInvite(user)} className={styles.svgTemplate}>
          <PlusSvg />
        </div>
      )}
    </div>
  );
};

export default ElementList;
