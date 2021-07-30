import { OnboardingNumberContent } from 'components/organisms';
import { AuthGuardTemplate, OnboardingTemplate } from 'templates';

import { Allow } from 'interfaces';

const OnboardingNumberPage = () => (
  <AuthGuardTemplate allow={Allow.logged}>
    <OnboardingTemplate>
      <OnboardingNumberContent />
    </OnboardingTemplate>
  </AuthGuardTemplate>
);

export default OnboardingNumberPage;
