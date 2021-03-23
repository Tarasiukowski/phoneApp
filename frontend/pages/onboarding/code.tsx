import OnboardingCodeContent from '../../components/organisms/onboardingCodeContent/onboardingCodeContent';
import IsLoggedTemplate from '../../templates/isLoggedTemplate/isLoggedTemplate';
import OnboardingTemplate from '../../templates/onboardingTemplate/onboardingTemplate';

const OnboardingCodePage = () => (
  <IsLoggedTemplate allow="logged" redirectTo="/singup">
    <OnboardingTemplate>
      <OnboardingCodeContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingCodePage;
