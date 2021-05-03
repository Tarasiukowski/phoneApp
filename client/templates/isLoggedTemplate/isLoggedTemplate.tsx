import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import Loader from '../../components/molecules/loader/loader';

import { login } from '../../reducers/userReducer';
import { checkOnboardingStage, fetcher } from '../../utils';
import { props } from './types';

const settings = {
  logged: true,
  notLogged: false,
};

const IsLoggedTemplate = ({ children, allow }: props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    fetcher('post', 'auth').then(({ user, status }) => {
      dispatch(login(user));

      const isLogged = user ? true : false;

      if (settings[allow] === isLogged) {
        if (status) {
          const { loading, redirectTo } = checkOnboardingStage(status, router.asPath);

          !loading ? setLoading(false) : router.push(redirectTo);
        } else {
          setLoading(false);
        }
      } else {
        if (isLogged) {
          const { loading, redirectTo } = checkOnboardingStage(status, router.asPath);

          !loading ? setLoading(false) : router.push(redirectTo);
        } else {
          router.push('/singup');
        }
      }
    });
  }, [router.asPath]);

  return <>{loading ? <Loader /> : children}</>;
};

export default IsLoggedTemplate;
