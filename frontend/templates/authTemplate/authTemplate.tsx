import styles from './authTemplate.module.scss'
import Logo from '../../public/svgs/logo.svg'

const AuthTemplate: React.FC<any> = ({ children }) => (
  <div className={styles.wrapper}>
    <Logo className={styles.logo} />
    {children}
  </div>
)

export default AuthTemplate