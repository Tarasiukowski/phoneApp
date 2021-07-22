import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { useError } from 'contexts';
import { FormVerify } from 'components/molecules';
import { paths } from '../../../../constants';
import { TypeVerify } from 'components/molecules/formVerify/types';

const OnboardingCodeContent = () => {
  const router = useRouter();

  const { setError } = useError();

  const handleOnSuccess = useCallback(() => {
    router.push(paths.onBoarding.number);
    setError(null);
  }, []);

  return <FormVerify type={TypeVerify.account} onSuccess={handleOnSuccess} />;
};

export { OnboardingCodeContent };
