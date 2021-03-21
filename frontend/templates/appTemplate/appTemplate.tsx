import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/userReducer';
import { User } from '../../interfaces';

interface props {
  children: ReactNode;
  user: User;
}

const AppTemplate = ({ children, user }: props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(login(user));
    }
  });

  return <>{children}</>;
};

export default AppTemplate;
