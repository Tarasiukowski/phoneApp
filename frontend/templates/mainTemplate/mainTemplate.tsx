import Navigation from "../../components/molecules/navigation/navigation";
import styles from './mainTemplate.module.scss'

const MainTemplate: React.FC= ({ children }) => (
  <>
    <Navigation />
    <div className={styles.content}>
      {children}
    </div>
  </>
)

export default MainTemplate