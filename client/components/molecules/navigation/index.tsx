import { useCallback } from 'react';

import { UserCard, ButtonNavigation } from 'components/atoms';
import { GroupsList, FriendsList } from '../index';

import { SearchSvg, ContactsSvg, SettingsSvg, MembersSvg } from '../../../public/svgs';
import { paths } from '../../../constants';
import { useSearcher } from 'contexts';
import styles from './navigation.module.scss';

const Navigation = () => {
  const { handleVisible } = useSearcher();

  const handleVisibleSearcher = useCallback(() => {
    handleVisible(true);
  }, []);

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <UserCard withDetailedView />
        <ButtonNavigation
          onClick={handleVisibleSearcher}
          icon={SearchSvg}
          content="Search"
          id="searcher"
        />
        <ButtonNavigation icon={ContactsSvg} href={paths.contacts} content="Contacts" />
        <ButtonNavigation icon={MembersSvg} href={paths.invites} content="Invites" />
        <ButtonNavigation icon={SettingsSvg} href={paths.settings.profile} content="Settings" />
      </div>
      <div>
        <GroupsList />
        <FriendsList />
      </div>
    </div>
  );
};

export { Navigation };
