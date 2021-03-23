import OnboardingTemplate from '../../templates/onboardingTemplate/onboardingTemplate';
import OnboardingNumberContent from '../../components/organisms/onBoardingContent/number/number';
import IsLoggedTemplate from '../../templates/isLoggedTemplate/isLoggedTemplate';

const OnboardingNumberPage = () => (
  <IsLoggedTemplate allow="logged" redirectTo="/singup">
    <OnboardingTemplate>
      <OnboardingNumberContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingNumberPage;
