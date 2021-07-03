import { useRouter } from 'next/router';

import { Loader } from 'components/molecules';

import { props } from './types';

const RedirectTemplate: React.FC<props> = ({ children, isRedirect, redirectTo }) => {
  const router = useRouter();

  if (isRedirect) {
    router.push(redirectTo);

    return <Loader />;
  }

  return <>{children}</>;
};

export { RedirectTemplate };
