import { AuthContent } from 'components/organisms';
import { Allow } from 'interfaces';
import { IsLoggedTemplate, AuthTemplate } from 'templates';

const LoginPage = () => (
  <IsLoggedTemplate allow={Allow.notLogged}>
    <AuthTemplate>
      <AuthContent />
    </AuthTemplate>
  </IsLoggedTemplate>
);

export default LoginPage;
