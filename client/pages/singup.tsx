import { AuthContent } from '../components/organisms';
import AuthTemplate from '../templates/authTemplate/authTemplate';
import IsLoggedTemplate from '../templates/isLoggedTemplate/isLoggedTemplate';

const SingUpPage = () => (
  <IsLoggedTemplate allow="notLogged">
    <AuthTemplate>
      <AuthContent />
    </AuthTemplate>
  </IsLoggedTemplate>
);

export default SingUpPage;
