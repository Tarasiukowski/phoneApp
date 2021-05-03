import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { route } from './types';

const Component = ({ component }: { component: ReactNode }) => <>{component}</>;

const Subpage = ({ routes, slugNumber }: { routes: route[]; slugNumber: number }) => {
  const {
    query: { slug },
  } = useRouter();

  return (
    <>
      {routes.map((route) => (
        <>{route.slug === 'settings' && <Component component={route.component} />}</>
      ))}
    </>
  );
};

export default Subpage;
