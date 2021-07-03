import { Alert } from 'components/atoms';

import { useError } from 'contexts';

const ErrorTemplate: React.FC = ({ children }) => {
  const { error } = useError();

  return (
    <>
      <Alert error={error} />
      {children}
    </>
  );
};

export { ErrorTemplate };
