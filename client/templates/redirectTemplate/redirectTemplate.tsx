import { useRouter } from 'next/router';
import Loader from '../../components/molecules/loader/loader';

interface props {
  isRedirect: boolean;
  redirectTo: string;
}

const RedirectTemplate: React.FC<props> = ({ children, isRedirect, redirectTo }) => {
  const router = useRouter();

  if (isRedirect) {
    router.push(redirectTo);

    return <Loader />;
  }

  return <>{children}</>;
};

export default RedirectTemplate;
