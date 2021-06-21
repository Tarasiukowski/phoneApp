import { useContext } from 'react';

import { Alert } from '../../components/atoms';

import { ErrorContext, ErrorProvider } from '../../contexts';

const ErrorTemplate: React.FC = ({ children }) => (
  <ErrorProvider>
    {(() => {
      const { error } = useContext(ErrorContext);

      return (
        <>
          <Alert error={error} />
          {children}
        </>
      );
    })()}
  </ErrorProvider>
);

export { ErrorTemplate };
