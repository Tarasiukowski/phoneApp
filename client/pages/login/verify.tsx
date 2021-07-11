import { FormVerify } from 'components/molecules';
import { TypeVerify } from 'components/molecules/formVerify/types';
import { IsLoggedTemplate, OnboardingTemplate as VerifyTemplate } from 'templates';

import { Allow } from 'interfaces';

const LoginVerifyPage = () => (
  <IsLoggedTemplate allow={Allow.logged}>
    <VerifyTemplate>
      <FormVerify type={TypeVerify.login} onSuccess={() => {}} />
    </VerifyTemplate>
  </IsLoggedTemplate>
);

export default LoginVerifyPage;
