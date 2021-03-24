import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Loader from '../../components/molecules/loader/loader';
import { login } from '../../reducers/userReducer';

interface props {
  children: ReactNode;
  redirectTo: string;
  allow: 'logged' | 'notLogged';
}

const IsLoggedTemplate = ({ children, redirectTo, allow }: props) => {
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
      .then(({ data: { user } }) => {
        dispatch(login(user));

        const isLogged = user ? true : false;

        if (settings[allow] === isLogged) {
          setLoading(false);
        } else {
          router.push(redirectTo);
        }
      });
  });

  return <>{loading ? <Loader /> : children}</>;
};

export default IsLoggedTemplate;
