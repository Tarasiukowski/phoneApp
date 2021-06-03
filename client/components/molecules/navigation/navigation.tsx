import { useState } from 'react';

import { UserCard, ButtonNavigation } from '../../atoms';
import GroupsList from '../groupsList/groupsList';
import FriendsList from '../friendsList/friendsList';
import SearcherTemplate from '../../../templates/sarcherTemplate/searcherTemplate';

import { SearchSvg, ContactsSvg, SettingsSvg, MembersSvg } from '../../../public/svgs';
// import ContactsSvg from "../../../public/svgs/contacts.svg"
// import SearchSvg from "../../../public/svgs/search.svg"
// import Settings from "../../../public/svgs/settings.svg"
import styles from './navigation.module.scss';

const Navigation = () => {
  const [searcherOpen, setSearcherOpen] = useState(false);

  return (
    <SearcherTemplate
      open={searcherOpen}
      onClose={() => {
        setSearcherOpen(false);
      }}
    >
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
    </SearcherTemplate>
  );
};

export default Navigation;
