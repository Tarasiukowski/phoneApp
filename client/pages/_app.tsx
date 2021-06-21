import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ErrorTemplate } from '../templates';

import store from '../store/index';
import '../style/globalStyle.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <ErrorTemplate>
      <Component {...pageProps} />
    </ErrorTemplate>
  </Provider>
);

export default MyApp;
