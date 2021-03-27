import ActiveUser from '../../atoms/activeUser/activeUser'
import styles from './navigation.module.scss'

const Navigation = () => (
  <div className={styles.template}>
    <div className={styles.header}>
      <ActiveUser />
    </div>
    <div>

    </div>
  </div>
)

export default Navigation