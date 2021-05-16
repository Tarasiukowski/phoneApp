import AuthTemplate from '../templates/authTemplate/authTemplate';
import AuthContent from '../components/organisms/authContent/authContent';
import IsLoggedTemplate from '../templates/isLoggedTemplate/isLoggedTemplate';

const LoginPage = () => (
  <IsLoggedTemplate allow="notLogged">
    <AuthTemplate>
      <AuthContent />
    </AuthTemplate>
  </IsLoggedTemplate>
);

export default LoginPage;
