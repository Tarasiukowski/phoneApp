import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/molecules';

import { login } from '../../reducers/userReducer';
import { getOnboardingStage, fetcher } from '../../utils';
import { props } from './types';
import { selectFriends, update } from '../../reducers/friendsReducer';

const settings = {
  logged: true,
  notLogged: false,
};

const IsLoggedTemplate = ({ children, allow }: props) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const router = useRouter();

  useEffect(() => {
    fetcher('post', '/auth').then((data) => {
      const user = data.user ? data.user.value : null;

      dispatch(login(user));

      const isLogged = user ? true : false;

      if (settings[allow] === isLogged) {
        if (isLogged) {
          const status = data.user.status;

          const { loading, redirectTo } = getOnboardingStage(status, router.asPath);

          if (!friends.length && status.onBoarding) {
            if (redirectTo === '/contacts') {
              fetcher('POST', '/user/friends').then(({ data }) => {
                dispatch(update(data));
                !loading ? setLoading(false) : router.push(redirectTo);
              });
            }
          } else {
            !loading ? setLoading(false) : router.push(redirectTo);
          }
        } else {
          setLoading(false);
        }
      } else {
        if (isLogged) {
          const status = data.user.status;
          const { loading, redirectTo } = getOnboardingStage(status, router.asPath);

          !loading ? setLoading(false) : router.push(redirectTo);
        } else {
          router.push('/singup');
        }
      }
    });
  }, [router.asPath]);

  return <>{loading ? <Loader /> : children}</>;
};

export { IsLoggedTemplate };
