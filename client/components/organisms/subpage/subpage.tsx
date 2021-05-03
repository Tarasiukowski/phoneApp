import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { route } from './types';
import Loader from '../../molecules/loader/loader';

const Component = ({ component }: { component: ReactNode }) => <>{component}</>;

const Subpage = ({ routes, slugNumber }: { routes: route[]; slugNumber: number }) => {
  const {
    query: { slug },
  } = useRouter();

  return (
    <>
      {routes.map((route) => (
        <>
          {slug === undefined ? (
            <Loader />
          ) : (
            route.slug === slug[slugNumber] && <Component component={route.component} />
          )}
        </>
      ))}
    </>
  );
};

export default Subpage;
