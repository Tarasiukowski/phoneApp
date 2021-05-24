import { useState } from 'react';

import ButtonNavigation from '../../atoms/buttonNavigation/buttonNavigation';
import UserCard from '../../atoms/userCard/userCard';
import GroupsList from '../groupsList/groupsList';
import FriendsList from '../friendsList/friendsList';

import { SearchSvg, ContactsSvg, SettingsSvg, MembersSvg } from '../../../public/svgs';
// import ContactsSvg from "../../../public/svgs/contacts.svg"
// import SearchSvg from "../../../public/svgs/search.svg"
// import Settings from "../../../public/svgs/settings.svg"
import styles from './navigation.module.scss';
import Searcher from '../searcher/searcher';

const Navigation = () => {
  const [searcherOpen, setSearcherOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.box}>
        <div className={styles.header}>
          <UserCard withDetailed />
          <ButtonNavigation
            onClick={() => {
              setSearcherOpen(true);
            }}
            icon={SearchSvg}
            content="Search"
            id="searcher"
          />
          <ButtonNavigation icon={ContactsSvg} href="/contacts" content="Contacts" />
          <ButtonNavigation icon={MembersSvg} href="/invites" content="Invites" />
          <ButtonNavigation icon={SettingsSvg} href="/settings/profile" content="Settings" />
        </div>
        <div>
          <GroupsList />
          <FriendsList />
        </div>
      </div>
      <Searcher
        open={searcherOpen}
        onClose={() => {
          setSearcherOpen(false);
        }}
      />
    </>
  );
};

export default Navigation;
