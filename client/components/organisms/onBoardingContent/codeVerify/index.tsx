import { useState } from 'react';

import { RedirectTemplate } from 'templates';

import { useError } from 'contexts';
import { FormVerify } from 'components/molecules';

const OnboardingCodeContent = () => {
  const [redirect, setRedirect] = useState(false);

  const { setError } = useError();

  const handleOnSuccess = () => {
    setRedirect(true);
    setError(null);
  };

  return (
    <RedirectTemplate isRedirect={redirect} redirectTo="/onboarding/number">
      <FormVerify type="account" onSuccess={handleOnSuccess} />
    </RedirectTemplate>
  );
};

export { OnboardingCodeContent };
