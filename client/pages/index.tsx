import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Loader } from 'components/molecules';

import { selectUser } from 'reducers/userReducer';

const IndexPage = () => {
  const router = useRouter();
  const user = useSelector(selectUser);

  const isLogged = user ? true : false;

  useEffect(() => {
    router.push(isLogged ? '/contacts' : '/singup');
  }, []);

  return <Loader />;
};

export default IndexPage;
