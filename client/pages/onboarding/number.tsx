import { OnboardingCodeContent } from '../../components/organisms';
import OnboardingTemplate from '../../templates/onboardingTemplate/onboardingTemplate';
import IsLoggedTemplate from '../../templates/isLoggedTemplate/isLoggedTemplate';

const OnboardingNumberPage = () => (
  <IsLoggedTemplate allow="logged">
    <OnboardingTemplate>
      <OnboardingCodeContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingNumberPage;
