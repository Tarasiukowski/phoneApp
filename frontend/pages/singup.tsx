import AuthTemplate from '../templates/authTemplate/authTemplate';
import AuthContent from '../components/organisms/authContent/authContent';
import IsLoggedTemplate from '../templates/isLoggedTemplate/isLoggedTemplate';

const SingUpPage = () => (
  <IsLoggedTemplate allow="notLogged" redirectTo="/onboarding/number">
    <AuthTemplate>
      <AuthContent />
    </AuthTemplate>
  </IsLoggedTemplate>
);

export default SingUpPage;
