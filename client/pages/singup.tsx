import { AuthContent } from 'components/organisms';
import { IsLoggedTemplate, AuthTemplate } from 'templates';

const SingUpPage = () => (
  <IsLoggedTemplate allow="notLogged">
    <AuthTemplate>
      <AuthContent />
    </AuthTemplate>
  </IsLoggedTemplate>
);

export default SingUpPage;
