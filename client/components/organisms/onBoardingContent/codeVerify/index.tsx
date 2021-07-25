import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FormVerify } from 'components/molecules';

import { useError } from 'contexts';
import { TypeVerify } from 'components/molecules/formVerify/types';
import { paths } from '../../../../constants';
import { fetcher, handleRequestError } from 'utils';

const OnboardingCodeContent = () => {
  const router = useRouter();

  const { setError } = useError();

  const handleOnSuccess = useCallback(async () => {
    try {
      await fetcher('PUT', '/user/update/onBoarding', {
        value: {
          value: false,
          stage: paths.onBoarding.number,
        },
      });

      router.push(paths.onBoarding.number);
      setError(null);
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  }, []);

  return <FormVerify type={TypeVerify.account} onSuccess={handleOnSuccess} />;
};

export { OnboardingCodeContent };
