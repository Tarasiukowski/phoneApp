import { OnboardingNumberContent } from 'components/organisms';
import { IsLoggedTemplate, OnboardingTemplate } from 'templates';

import { Allow } from 'interfaces';

const OnboardingNumberPage = () => (
  <IsLoggedTemplate allow={Allow.logged}>
    <OnboardingTemplate>
      <OnboardingNumberContent />
    </OnboardingTemplate>
  </IsLoggedTemplate>
);

export default OnboardingNumberPage;
