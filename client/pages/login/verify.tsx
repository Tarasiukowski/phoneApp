import { FormVerify } from 'components/molecules';
import { IsLoggedTemplate, OnboardingTemplate as VerifyTemplate } from 'templates';

const LoginVerifyPage = () => (
  <IsLoggedTemplate allow="logged">
    <VerifyTemplate>
      <FormVerify type="login" onSuccess={() => {}} />
    </VerifyTemplate>
   </IsLoggedTemplate>
);

export default LoginVerifyPage;
