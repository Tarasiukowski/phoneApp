import Link from 'next/link';

import GroupElementList from './elementList/elementList';

import styles from './groupsList.module.scss';

const GroupsList = () => (
  <div>
    <p className={styles.heading}>Groups List</p>
    <div className={styles.template}>
      <Link href="/group/1" children={<GroupElementList />} />
    </div>
  </div>
);

export default GroupsList;
