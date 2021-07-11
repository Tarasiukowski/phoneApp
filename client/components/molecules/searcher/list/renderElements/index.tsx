import { useEffect, useState } from 'react';
import Link from 'next/link';

import ElementList from './elementList';

import { props, ReceivedData } from './types';
import { SearchType } from '../../types';
import { formatValuesObject } from 'utils';

const RenderElements = ({ data, onSelect, notFound: NotFound }: props) => {
  const [receivedData, setReceivedData] = useState<ReceivedData>([]);

  useEffect(() => {
    const { conversations, routes } = data;

    setReceivedData([...conversations.data, ...routes.data]);
  }, [data]);

  return (
    <>
      {receivedData.length ? (
        receivedData.map((elem) => {
          if (elem.type === SearchType.conversation) {
            const { user, id } = elem;

            const fullname = formatValuesObject(user.fullname);

            return (
              <Link
                href={`/inbox/${id}`}
                key={id}
                children={<ElementList content={fullname} onClick={onSelect} user={user} />}
              />
            );
          } else if (elem.type === SearchType.route) {
            const hrefs = elem.hrefs;
            const href = elem.href;

            if (hrefs) {
              return hrefs.map((href) => {
                return (
                  <Link
                    href={href}
                    key={href}
                    children={<ElementList content={href} onClick={onSelect} />}
                  />
                );
              });
            } else if (href) {
              return (
                <Link
                  href={href}
                  key={href}
                  children={<ElementList content={href} onClick={onSelect} />}
                />
              );
            }
          }
        })
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default RenderElements;
