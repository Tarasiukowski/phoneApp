import ButtonNavigation from '../../atoms/buttonNavigation/buttonNavigation';
import UserCard from '../../atoms/userCard/userCard';
import GroupsList from '../groupsList/groupsList';
import FriendsList from '../friendsList/friendsList';

import { SearchSvg, ContactsSvg, SettingsSvg } from '../../../public/svgs';
// import ContactsSvg from "../../../public/svgs/contacts.svg"
// import SearchSvg from "../../../public/svgs/search.svg"
// import Settings from "../../../public/svgs/settings.svg"
import styles from './navigation.module.scss';

const Navigation = () => (
  <div className={styles.box}>
    <div className={styles.header}>
      <UserCard withDetailed />
      <ButtonNavigation icon={<SearchSvg />} content="Search" />
      <ButtonNavigation href="/contacts" icon={<ContactsSvg />} content="Contacts" />
      <ButtonNavigation href="/settings/profile" icon={<SettingsSvg />} content="Settings" />
    </div>
    <div>
      <GroupsList />
      <FriendsList />
    </div>
  </div>
);

export default Navigation;
