import { AuthContent } from 'components/organisms';
import { IsLoggedTemplate, AuthTemplate } from 'templates';

import { Allow } from 'interfaces';

const SingUpPage = () => (
  <IsLoggedTemplate allow={Allow.notLogged}>
    <AuthTemplate>
      <AuthContent />
    </AuthTemplate>
  </IsLoggedTemplate>
);

export default SingUpPage;
