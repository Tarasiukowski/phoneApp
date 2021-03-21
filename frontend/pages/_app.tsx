import type { AppProps, AppContext } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/index';
import AppTemplate from '../templates/appTemplate/appTemplate';
import { loginByToken } from '../utils/loginByToken';
import { User } from '../interfaces';
import '../style/globalStyle.scss';

function MyApp({ Component, pageProps, user }: AppProps & { user: User }) {
  return (
    <Provider store={store}>
      <AppTemplate user={user}>
        <Component {...pageProps} />
      </AppTemplate>
    </Provider>
  );
}

MyApp.getInitialProps = async ({ ctx: { req } }: AppContext) => {
  const user = await loginByToken(req);

  return { user };
};

export default MyApp;
