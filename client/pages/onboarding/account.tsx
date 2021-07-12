import { OnboardingAccountContent } from 'components/organisms';
import { IsLoggedTemplate, OnboardingTemplate } from 'templates';

import { Allow } from 'interfaces';

const OnboardingAccountPage = () => (
  <IsLoggedTemplate allow={Allow.logged}>
    <OnboardingTemplate>
      <OnboardingAccountContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingAccountPage;
