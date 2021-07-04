import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ErrorTemplate } from 'templates';
import { ErrorProvider, MultiTaskProvider } from 'contexts';

import store from 'store/index';
import 'style/globalStyle.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <MultiTaskProvider>
      <ErrorProvider>
        <ErrorTemplate>
          <Component {...pageProps} />
        </ErrorTemplate>
      </ErrorProvider>
    </MultiTaskProvider>
  </Provider>
);

export default MyApp;
