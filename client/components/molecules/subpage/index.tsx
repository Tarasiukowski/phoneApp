import { useRouter } from 'next/router';

import { Loader } from '../index';

import { props } from './types';

const Subpage = ({ routes, slugNumber }: props) => {
  const {
    query: { slug: activeSlug },
  } = useRouter();

  return (
    <>
      {activeSlug === undefined ? (
        <Loader />
      ) : (
        routes.map(
          ({ slug, component: Component }) =>
            slug === activeSlug[slugNumber] && <Component key={slug} />,
        )
      )}
    </>
  );
};

export { Subpage };
