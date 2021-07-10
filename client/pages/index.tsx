import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Loader } from 'components/molecules';

import { useUser } from 'setup/reducers/userReducer';

const IndexPage = () => {
  const router = useRouter();
  const user = useUser();

  const isLogged = user ? true : false;

  useEffect(() => {
    router.push(isLogged ? '/contacts' : '/singup');
  }, []);

  return <Loader />;
};

export default IndexPage;
