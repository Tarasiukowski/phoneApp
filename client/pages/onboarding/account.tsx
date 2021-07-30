import { OnboardingAccountContent } from 'components/organisms';
import { AuthGuardTemplate, OnboardingTemplate } from 'templates';

import { Allow } from 'interfaces';

const OnboardingAccountPage = () => (
  <AuthGuardTemplate allow={Allow.logged}>
    <OnboardingTemplate>
      <OnboardingAccountContent />
    </OnboardingTemplate>
  </AuthGuardTemplate>
);

export default OnboardingAccountPage;
