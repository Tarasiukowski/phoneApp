import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ErrorTemplate, MultiTaskTemplate, SearcherTemplate } from 'templates';
import { ErrorProvider, MultiTaskProvider, SearcherProvider } from 'contexts';

import store from 'setup/store';
import 'style/globalStyle.scss';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <SearcherProvider>
      <SearcherTemplate>
        <MultiTaskProvider>
          <MultiTaskTemplate>
            <ErrorProvider>
              <ErrorTemplate>
                <Component {...pageProps} />
              </ErrorTemplate>
            </ErrorProvider>
          </MultiTaskTemplate>
        </MultiTaskProvider>
      </SearcherTemplate>
    </SearcherProvider>
  </Provider>
);

export default MyApp;
