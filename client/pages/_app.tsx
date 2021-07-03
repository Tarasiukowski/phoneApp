import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ErrorTemplate } from 'templates';
import { ErrorProvider } from 'contexts';

import store from 'store/index';
import 'style/globalStyle.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <ErrorProvider>
      <ErrorTemplate>
        <Component {...pageProps} />
      </ErrorTemplate>
    </ErrorProvider>
  </Provider>
);

export default MyApp;
