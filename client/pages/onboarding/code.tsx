import { OnboardingCodeContent } from 'components/organisms';
import { IsLoggedTemplate, OnboardingTemplate } from 'templates';

import { Allow } from 'interfaces';

const OnboardingCodePage = () => (
  <IsLoggedTemplate allow={Allow.logged}>
    <OnboardingTemplate>
      <OnboardingCodeContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingCodePage;
