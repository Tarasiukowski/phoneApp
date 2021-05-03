import FriendsListElement from "../../atoms/userCard/userCard"
import AddButton from "./addButton/addButton";

import styles from './friendsList.module.scss';

const FriendsList = () => (
  <div>
    <h2 className={styles.heading}>Friensd List</h2>
    <div className={styles.template}>
      <FriendsListElement friend />
      <AddButton />
    </div>
  </div>
);

export default FriendsList;
