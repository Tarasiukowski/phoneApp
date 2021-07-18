import { Loader } from 'components/molecules';

import { useLoading } from 'contexts/loadingContext';

const LoadingTemplate: React.FC = ({ children }) => {
  const { loading } = useLoading();

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export { LoadingTemplate };
