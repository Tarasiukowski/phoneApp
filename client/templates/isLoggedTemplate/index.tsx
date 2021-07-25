import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { login } from 'setup/reducers/userReducer';
import { update } from 'setup/reducers/friendsReducer';
import { getUserStage, fetcher } from 'utils';
import { props } from './types';
import { useError } from 'contexts';
import { ERROR_MESSAGES } from 'common';
import { loggedPaths } from 'data';
import { paths } from '../../constants';
import { useLoading } from 'contexts/loadingContext';

const settings = {
  logged: true,
  notLogged: false,
};

const IsLoggedTemplate = ({ children, allow }: props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { setError } = useError();
  const { toggleLoading, loading } = useLoading();

  const activePath = router.asPath;
  const fetchFullUser = loggedPaths.some((path) => activePath.startsWith(path));

  const fetchFriends = () => fetcher('POST', '/user/friends');

  useEffect(() => {
    fetcher('post', '/auth', { fullUser: fetchFullUser }).then((data) => {
      const user = data.user ? data.user.value : null;

      console.log(user)

      dispatch(login(user));

      const isLogged = user ? true : false;

      if (settings[allow] === isLogged) {
        if (isLogged) {
          const status = data.user.status;

          const { notAllowed, redirectTo } = getUserStage(status, activePath);

          if (status.onBoarding) {
            fetchFriends().then((data) => {
              dispatch(update(data));
              notAllowed ? router.push(redirectTo) : toggleLoading(false);
            });
          } else {
            notAllowed ? router.push(redirectTo) : toggleLoading(false);
          }
        } else {
          toggleLoading(false);
        }
      } else {
        setError({ msg: ERROR_MESSAGES.NOT_ALLOWED, id: Math.random() });

        if (isLogged) {
          const status = data.user.status;
          const { notAllowed, redirectTo } = getUserStage(status, activePath);

          notAllowed ? router.push(redirectTo) : toggleLoading(false);
        } else {
          router.push(paths.singUp);
        }
      }
    });
  }, [activePath]);

  return <>{loading || children}</>;
};

export { IsLoggedTemplate };
