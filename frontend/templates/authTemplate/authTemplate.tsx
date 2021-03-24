import Logo from '../../public/svgs/logo.svg';
import styles from './authTemplate.module.scss';

const AuthTemplate: React.FC = ({ children }) => (
  <div className={styles.wrapper}>
    <Logo className={styles.logo} />
    {children}
  </div>
);

export default AuthTemplate;
