import { OnboardingNumberContent } from '../../components/organisms';
import OnboardingTemplate from '../../templates/onboardingTemplate/onboardingTemplate';
import IsLoggedTemplate from '../../templates/isLoggedTemplate/isLoggedTemplate';

const OnboardingNumberPage = () => (
  <IsLoggedTemplate allow="logged">
    <OnboardingTemplate>
      <OnboardingNumberContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingNumberPage;
