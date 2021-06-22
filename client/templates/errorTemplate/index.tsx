import { useContext } from 'react';

import { Alert } from '../../components/atoms';

import { ErrorContext } from '../../contexts';

const ErrorTemplate: React.FC = ({ children }) => {
  const { error } = useContext(ErrorContext);

  return (
    <>
      <Alert error={error} />
      {children}
    </>
  );
};

export { ErrorTemplate };
