import Link from 'next/link';

import GroupElementList from './elementList';

import { useUser } from 'hooks';
import styles from './groupsList.module.scss';

const GroupsList = () => {
  const user = useUser();
  const groups = user ? user.groups : [];

  if (groups.length) {
    return (
      <div>
        <p className={styles.heading}>Groups List</p>
        <div className={styles.template}>
          {groups.map(({ _id, name }) => (
            <Link href={`/group/${_id}`} children={<GroupElementList name={name} />} key={_id} />
          ))}
        </div>
      </div>
    );
  }

  return null;
};
export { GroupsList };
