import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import AuthTemplate from '../templates/authTemplate/authTemplate';
import AuthContent from '../components/organisms/authContent/authContent';
import { login } from '../reducers/userReducer';
import { loginByToken } from '../utils/loginByToken';
import { propsAuthPage } from '../interfaces/index';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await loginByToken(req, res);

  return {
    props: {
      user,
    },
  };
};

const LoginPage = ({ user }: propsAuthPage) => {
  const dispatch = useDispatch();

  dispatch(login(user));

  return (
    <AuthTemplate>
      <AuthContent login />
    </AuthTemplate>
  );
};

export default LoginPage;