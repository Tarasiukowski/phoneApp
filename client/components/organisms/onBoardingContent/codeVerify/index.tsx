import { useCallback, useState } from 'react';

import { RedirectTemplate } from 'templates';

import { useError } from 'contexts';
import { FormVerify } from 'components/molecules';
import { paths } from '../../../../constants';
import { TypeVerify } from 'components/molecules/formVerify/types';

const OnboardingCodeContent = () => {
  const [redirect, setRedirect] = useState(false);

  const { setError } = useError();

  const handleOnSuccess = useCallback(() => {
    setRedirect(true);
    setError(null);
  }, []);

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo={paths.OnBoarding.Number}>
      <FormVerify type={TypeVerify.account} onSuccess={handleOnSuccess} />
    </RedirectTemplate>
  );
};

export { OnboardingCodeContent };
