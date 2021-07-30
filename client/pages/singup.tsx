import { AuthContent } from 'components/organisms';
import { AuthGuardTemplate, AuthTemplate } from 'templates';

import { Allow } from 'interfaces';

const SingUpPage = () => (
  <AuthGuardTemplate allow={Allow.notLogged}>
    <AuthTemplate>
      <AuthContent />
    </AuthTemplate>
  </AuthGuardTemplate>
);

export default SingUpPage;
