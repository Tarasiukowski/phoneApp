import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ErrorTemplate, MultiTaskTemplate } from 'templates';
import { ErrorProvider, MultiTaskProvider } from 'contexts';

import store from 'store/index';
import 'style/globalStyle.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <MultiTaskProvider>
      <MultiTaskTemplate>
        <ErrorProvider>
          <ErrorTemplate>
            <Component {...pageProps} />
          </ErrorTemplate>
        </ErrorProvider>
      </MultiTaskTemplate>
    </MultiTaskProvider>
  </Provider>
);

export default MyApp;
