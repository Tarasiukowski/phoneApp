import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Loader from '../../components/molecules/loader/loader';
import { login } from '../../reducers/userReducer';

interface props {
  children: ReactNode;
  allow: 'logged' | 'notLogged';
}

const IsLoggedTemplate = ({ children, allow }: props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const settings = {
    logged: true,
    notLogged: false,
  };

  useEffect(() => {
    axios
      .post('http://localhost:7000/auth/byToken', {}, { withCredentials: true })
      .then(({ data: { user, status } }) => {
        dispatch(login(user));

        const isLogged = user ? true : false;

        if (
          settings[allow] === isLogged &&
          (status ? status?.redirectTo === router.pathname : true)
        ) {
          setLoading(false);
        } else {
          if (isLogged) {
            router.push(status?.redirectTo);
          } else {
            router.push("/singup")
          }
        }
      });
  });

  return <>{loading ? <Loader /> : children}</>;
};

export default IsLoggedTemplate;
