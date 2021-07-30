import { OnboardingCodeContent } from 'components/organisms';
import { AuthGuardTemplate, OnboardingTemplate } from 'templates';

import { Allow } from 'interfaces';

const OnboardingCodePage = () => (
  <AuthGuardTemplate allow={Allow.logged}>
    <OnboardingTemplate>
      <OnboardingCodeContent />
    </OnboardingTemplate>
  </AuthGuardTemplate>
);

export default OnboardingCodePage;
