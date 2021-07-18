import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ErrorTemplate, MultiTaskTemplate, SearcherTemplate } from 'templates';
import { ErrorProvider, MultiTaskProvider, SearcherProvider } from 'contexts';

import store from 'setup/store';
import 'style/globalStyle.scss';
import { LoadingProvider } from 'contexts/loadingContext';
import { LoadingTemplate } from 'templates/loadingTemplate';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <LoadingProvider>
      <LoadingTemplate>
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
      </LoadingTemplate>
    </LoadingProvider>
  </Provider>
);

export default MyApp;
