import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Loader } from 'components/molecules';

import { login } from 'reducers/userReducer';
import { update } from 'reducers/friendsReducer';
import { getOnboardingStage, fetcher } from 'utils';
import { props } from './types';
import { useError } from 'contexts';
import { ERROR } from 'common';

const settings = {
  logged: true,
  notLogged: false,
};

const IsLoggedTemplate = ({ children, allow }: props) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const { setError } = useError();

  const path = router.asPath;

  const fetchFriends = () => fetcher('POST', '/user/friends');

  useEffect(() => {
    fetcher('post', '/auth').then((data) => {
      const user = data.user ? data.user.value : null;

      dispatch(login(user));

      const isLogged = user ? true : false;

      if (settings[allow] === isLogged) {
        if (isLogged) {
          const status = data.user.status;

          const { loading, redirectTo } = getOnboardingStage(status, path);

          if (status.onBoarding) {
            fetchFriends().then((data) => {
              dispatch(update(data));
              loading ? router.push(redirectTo) : setLoading(false);
            });
          } else {
            loading ? router.push(redirectTo) : setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } else {
        setError({ msg: ERROR.NOT_ALLOWED, id: Math.random() });

        if (isLogged) {
          const status = data.user.status;
          const { loading, redirectTo } = getOnboardingStage(status, path);

          loading ? router.push(redirectTo) : setLoading(false);
        } else {
          router.push('/singup');
        }
      }
    });
  }, [path]);

  return <>{loading ? <Loader /> : children}</>;
};

export { IsLoggedTemplate };
