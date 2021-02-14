import AuthTemplate from "../templates/authTemplate/authTemplate"
import AuthContent from '../components/organisms/authContent/authContent'

const LoginPage = () => (
  <AuthTemplate>
    <AuthContent login />
  </AuthTemplate>
)

export default LoginPage