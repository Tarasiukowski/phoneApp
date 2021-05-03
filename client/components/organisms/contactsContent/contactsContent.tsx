import UserDetailed from '../chatContent/userDetailed/userDetailed';
import UserCard from '../../atoms/userCard/userCard';

import styles from './contactsContent.module.scss';
import { SearchSvg } from "../../../public/svgs"

const ContactsContent = () => (
  <>
    <div className={styles.template}>
      <div className={styles.header}>
        <p>Friends</p>
        <span>1</span>
      </div>
      <div className={styles.content}>
        <div className={styles.inputTemplate}>
          <div>
            <SearchSvg />
          </div>
          <div>
            <input placeholder="Search" />
          </div>
        </div>
        <div className={styles.listElement}>
           <UserCard />
        </div>
      </div>
    </div>
    <UserDetailed />
  </>
);

export default ContactsContent;
