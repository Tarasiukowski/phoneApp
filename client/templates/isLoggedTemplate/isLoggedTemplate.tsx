import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Loader from '../../components/molecules/loader/loader';
import { login } from '../../reducers/userReducer';
import { fetcher } from '../../utils';
import { propsIsLoggedTemplate } from '../../interfaces';

const settings = {
  logged: true,
  notLogged: false,
};

const IsLoggedTemplate = ({ children, allow }: propsIsLoggedTemplate) => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    fetcher('post', 'auth').then(({ user, status }) => {
      dispatch(login(user));

      const isLogged = user ? true : false;

      if (settings[allow] === isLogged && (status ? status?.redirectTo === router.asPath : true)) {
        setLoading(false);
      } else if (isLogged && (router.asPath === '/singup' || router.asPath === '/login')) {
        router.push(status?.redirectTo);
      } else {
        if (isLogged) {
          if (status.onBoarding) {
            router.push(status?.redirectTo);
          }
        } else {
          router.push('/singup');
        }
      }
    });
  }, [router.asPath]);

  return <>{loading ? <Loader /> : children}</>;
};

export default IsLoggedTemplate;
