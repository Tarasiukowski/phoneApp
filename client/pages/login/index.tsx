import { AuthContent } from 'components/organisms';
import { Allow } from 'interfaces';
import { AuthGuardTemplate, AuthTemplate } from 'templates';

const LoginPage = () => (
  <AuthGuardTemplate allow={Allow.notLogged}>
    <AuthTemplate>
      <AuthContent />
    </AuthTemplate>
  </AuthGuardTemplate>
);

export default LoginPage;
