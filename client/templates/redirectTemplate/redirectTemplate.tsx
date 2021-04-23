import { useRouter } from 'next/router';
import Loader from '../../components/molecules/loader/loader';
import { propsRedirectTemplate } from '../../interfaces';

const RedirectTemplate: React.FC<propsRedirectTemplate> = ({
  children,
  isRedirect,
  redirectTo,
}) => {
  const router = useRouter();

  if (isRedirect) {
    router.push(redirectTo);

    return <Loader />;
  }

  return <>{children}</>;
};

export default RedirectTemplate;
