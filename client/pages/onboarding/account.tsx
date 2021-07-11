import { OnboardingAccountContent } from 'components/organisms';
import { IsLoggedTemplate, OnboardingTemplate } from 'templates';

import { Allow } from 'interfaces';

const OnboardingAccountPage = () => (
  <IsLoggedTemplate allow={Allow.notLogged}>
    <OnboardingTemplate>
      <OnboardingAccountContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingAccountPage;
