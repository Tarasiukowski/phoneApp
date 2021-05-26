import { OnboardingCodeContent } from '../../components/organisms'
import IsLoggedTemplate from '../../templates/isLoggedTemplate/isLoggedTemplate';
import OnboardingTemplate from '../../templates/onboardingTemplate/onboardingTemplate';

const OnboardingCodePage = () => (
  <IsLoggedTemplate allow="logged">
    <OnboardingTemplate>
      <OnboardingCodeContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingCodePage;
