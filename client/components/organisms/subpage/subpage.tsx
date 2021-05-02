import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { route } from './types';

const Subpage = ({ routes, slugNumber }: { routes: route[]; slugNumber: number }) => {
  const [activeSubpage, setActiveSubpage] = useState<ReactNode>(null);

  const {
    query: { slug },
  } = useRouter();

  const data = useRouter();

  useEffect(() => {
    console.log(data);

    if (slug) {
      routes.map((route) => {
        if (route.slug === slug[slugNumber]) {
          setActiveSubpage(route.component);
        }
      });
    }
  }, [slug]);

  return <>{activeSubpage}</>;
};

export default Subpage;
