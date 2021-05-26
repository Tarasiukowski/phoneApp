import { OnboardingAccountContent } from '../../components/organisms'
import IsLoggedTemplate from '../../templates/isLoggedTemplate/isLoggedTemplate';
import OnboardingTemplate from '../../templates/onboardingTemplate/onboardingTemplate';

const OnboardingAccountPage = () => (
  <IsLoggedTemplate allow="logged">
    <OnboardingTemplate>
      <OnboardingAccountContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingAccountPage;
