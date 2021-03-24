import OnboardingAccountContent from '../../components/organisms/onboardingAccountContent/onboardingAccountContent';
import IsLoggedTemplate from '../../templates/isLoggedTemplate/isLoggedTemplate';
import OnboardingTemplate from '../../templates/onboardingTemplate/onboardingTemplate';

const OnboardingAccountPage = () => (
  <IsLoggedTemplate allow="logged" redirectTo="/singup">
    <OnboardingTemplate>
      <OnboardingAccountContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingAccountPage;
