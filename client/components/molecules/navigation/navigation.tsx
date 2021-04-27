import ButtonNavigation from '../../atoms/buttonNavigation/buttonNavigation';
import UserCard from '../../atoms/userCard/userCard';
import GroupsList from '../groupsList/groupsList';
import { SearchSvg, ContactsSvg, SettingsSvg } from "../../../public/svgs"
// import ContactsSvg from "../../../public/svgs/contacts.svg"
// import SearchSvg from "../../../public/svgs/search.svg"
// import Settings from "../../../public/svgs/settings.svg"
import styles from './navigation.module.scss';

const Navigation = () => (
  <div className={styles.box}>
    <div className={styles.header}>
      <UserCard />
      <ButtonNavigation
        icon={<SearchSvg />}
        content="Search"
      />
      <ButtonNavigation
        icon={<ContactsSvg />}
        content="Contacts"
      />
      <ButtonNavigation
        icon={<SettingsSvg />}
        content="Settings"
      />
    </div>
    <div>
      <GroupsList />
    </div>
  </div>
);

export default Navigation;
