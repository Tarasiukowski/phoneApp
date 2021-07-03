import { OnboardingAccountContent } from 'components/organisms';
import { IsLoggedTemplate, OnboardingTemplate } from 'templates';

const OnboardingAccountPage = () => (
  <IsLoggedTemplate allow="logged">
    <OnboardingTemplate>
      <OnboardingAccountContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingAccountPage;
