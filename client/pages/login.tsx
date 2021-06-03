import { AuthContent } from '../components/organisms';
import { IsLoggedTemplate, AuthTemplate } from '../templates';

const LoginPage = () => (
  <IsLoggedTemplate allow="notLogged">
    <AuthTemplate>
      <AuthContent />
    </AuthTemplate>
  </IsLoggedTemplate>
);

export default LoginPage;
