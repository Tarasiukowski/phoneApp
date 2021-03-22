import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../reducers/userReducer';

const AppTemplate: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedUser = useSelector(selectUser);

  useEffect(() => {
    axios
      .post('http://localhost:7000/auth/byToken', {}, { withCredentials: true })
      .then(({ data: { user } }) => {
        if (selectedUser !== user) {
          dispatch(login(user));
        }
      });
  }, [router.asPath]);

  return <>{children}</>;
};

export default AppTemplate;
