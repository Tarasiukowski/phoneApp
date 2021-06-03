import { OnboardingNumberContent } from '../../components/organisms';
import { IsLoggedTemplate, OnboardingTemplate } from '../../templates';

const OnboardingNumberPage = () => (
  <IsLoggedTemplate allow="logged">
    <OnboardingTemplate>
      <OnboardingNumberContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingNumberPage;
