import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/userReducer';
import { User } from '../../interfaces';

interface props {
  children: ReactNode;
  user: User;
}

const AppTemplate = ({ children, user }: props) => {
  const dispatch = useDispatch();

  dispatch(login(user));

  return <>{children}</>;
};

export default AppTemplate;
