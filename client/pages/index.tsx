import { useRouter } from 'next/router';

import { Loader } from 'components/molecules';

import { paths } from '../constants';
import { useUser } from 'setup/reducers/userReducer';
import { useDidMount } from 'hooks';

const IndexPage = () => {
  const router = useRouter();
  const user = useUser();

  const isLogged = user ? true : false;

  useDidMount(() => {
    router.push(isLogged ? paths.contacts : paths.singUp);
  });

  return <Loader />;
};

export default IndexPage;
