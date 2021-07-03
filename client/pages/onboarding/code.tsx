import { OnboardingCodeContent } from 'components/organisms';
import { IsLoggedTemplate, OnboardingTemplate } from 'templates';

const OnboardingCodePage = () => (
  <IsLoggedTemplate allow="logged">
    <OnboardingTemplate>
      <OnboardingCodeContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingCodePage;
