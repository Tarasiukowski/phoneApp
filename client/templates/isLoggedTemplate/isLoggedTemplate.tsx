import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/molecules/loader/loader';

import { login } from '../../reducers/userReducer';
import { checkOnboardingStage, fetcher } from '../../utils';
import { props } from './types';
import { selectFriends, update } from '../../reducers/friendsReducer';

const settings = {
  logged: true,
  notLogged: false,
};

const IsLoggedTemplate = ({ children, allow }: props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const router = useRouter();

  useEffect(() => {
    fetcher('post', '/auth').then(({ user, status }) => {
      dispatch(login(user));

      const isLogged = user ? true : false;

      if (settings[allow] === isLogged) {
        if (status) {
          const { loading, redirectTo } = checkOnboardingStage(status, router.asPath);

          if (!friends.length && status.onBoarding) {
            if (redirectTo === '/contacts') {
              fetcher('POST', '/user/friends', { email: user.email }).then((data) => {
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
