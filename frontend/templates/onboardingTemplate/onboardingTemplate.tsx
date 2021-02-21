import styles from './onboardingTemplate.module.scss';
import { Button } from '../../components/atoms/button/button';
import Logo from '../../public/svgs/logo.svg';

const OnboardingTemplate: React.FC = ({ children }) => (
  <div className={styles.wrapper}>
    <Logo className={styles.logo} />
    <Button absolute={{ right: '25px', top: '15px' }} transparent>
      Sign out
    </Button>
    {children}
  </div>
);

export default OnboardingTemplate;
