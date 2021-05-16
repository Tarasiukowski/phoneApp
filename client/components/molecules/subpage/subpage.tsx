import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import Loader from '../../molecules/loader/loader';

import { route } from './types';

const Component = ({ component }: { component: ReactNode }) => <>{component}</>;

const Subpage = ({ routes, slugNumber }: { routes: route[]; slugNumber: number }) => {
  const {
    query: { slug },
  } = useRouter();

  return (
    <>
      {slug === undefined ? (
        <Loader />
      ) : (
        routes.map(
          (route) =>
            route.slug === slug[slugNumber] && (
              <Component key={route.slug} component={route.component} />
            ),
        )
      )}
    </>
  );
};

export default Subpage;
