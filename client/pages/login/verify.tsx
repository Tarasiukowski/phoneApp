import { useRouter } from 'next/router';

import { FormVerify } from 'components/molecules';
import { TypeVerify } from 'components/molecules/formVerify/types';
import { AuthGuardTemplate, OnboardingTemplate as VerifyTemplate } from 'templates';

import { Allow } from 'interfaces';
import { paths } from '../../constants';
import { useCallback } from 'react';

const LoginVerifyPage = () => {
  const router = useRouter();

  const handleOnSuccess = useCallback(() => {
    router.push(paths.contacts);
  }, []);

  return (
    <AuthGuardTemplate allow={Allow.logged}>
      <VerifyTemplate>
        <FormVerify type={TypeVerify.login} onSuccess={handleOnSuccess} />
      </VerifyTemplate>
    </AuthGuardTemplate>
  );
};

export default LoginVerifyPage;
