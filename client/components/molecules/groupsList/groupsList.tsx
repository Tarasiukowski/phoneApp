import GroupElementList from "../../atoms/groupElementList/groupElementList"
import styles from "./groupsList.module.scss"

const GroupsList = () => (
  <div>
    <p className={styles.heading}>GroupsList</p>
    <div className={styles.template}>
      <GroupElementList />
      <GroupElementList />
    </div>
  </div>
)

export default GroupsList