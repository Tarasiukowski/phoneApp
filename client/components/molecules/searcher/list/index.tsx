import Link from 'next/link';

import { props } from './types';
import { SearchData } from '../types';
import styles from './list.module.scss';
import ElementList from './elementList';

const List = ({ data, inputValue, onSelect }: props) => {
  const { routes, conversations } = data;

  return (
    <div className={styles.lists}>
      {inputValue.length ? (
        <>
          {conversations.data.length || routes.data.length ? (
            <>
              {(() => {
                const elems: JSX.Element[] = [];

                let key: keyof SearchData;

                for (key in data) {
                  const dataOfKey = data[key].data as any[];

                  dataOfKey.map((elem) => {
                    if (key === 'conversations') {
                      const { user, id } = elem;

                      const {
                        fullname: { firstname, lastname },
                      } = user;

                      elems.push(
                        <Link
                          href={`/inbox/${id}`}
                          key={id}
                          children={
                            <ElementList
                              content={`${firstname} ${lastname}`}
                              onClick={onSelect}
                              user={user}
                            />
                          }
                        />,
                      );
                    } else {
                      const { values, value } = elem;

                      if (typeof value === 'string') {
                        elems.push(
                          <Link
                            href={value}
                            key={value}
                            children={<ElementList content={value} onClick={onSelect} />}
                          />,
                        );
                      } else {
                        values.map((value: string) => {
                          elems.push(
                            <Link
                              href={value}
                              key={value}
                              children={<ElementList content={value} onClick={onSelect} />}
                            />,
                          );
                        });
                      }
                    }
                  });
                }

                return elems;
              })()}
            </>
          ) : (
            <p className={styles.info}>Not found</p>
          )}
        </>
      ) : (
        <p className={styles.info}>I will find what you need for you.</p>
      )}
    </div>
  );
};

export default List;
