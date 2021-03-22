import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/index';
import AppTemplate from '../templates/appTemplate/appTemplate';
import '../style/globalStyle.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppTemplate>
        <Component {...pageProps} />
      </AppTemplate>
    </Provider>
  );
}

export default MyApp;
