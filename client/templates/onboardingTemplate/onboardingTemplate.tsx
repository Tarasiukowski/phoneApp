import { Button } from '../../components/atoms/button/button';

import Logo from '../../public/svgs/logo.svg';
import { logout } from '../../utils';
import styles from './onboardingTemplate.module.scss';

const OnboardingTemplate: React.FC = ({ children }) => (
  <div className={styles.wrapper}>
    <Logo className={styles.logo} />
    <Button
      onClick={() => logout()}
      style={{ position: 'absolute', right: '25px', top: '25px' }}
      transparent
    >
      Sign out
    </Button>
    {children}
  </div>
);

export default OnboardingTemplate;
