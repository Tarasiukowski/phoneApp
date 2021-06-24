import Link from 'next/link';

import ElementList from './elementList';

import { SearchData } from '../types';
import { props } from './types';
import styles from './list.module.scss';

const List = ({ data, inputValue, onSelect }: props) => {
  const renderList = (data: SearchData) => {
    const { conversations, routes } = data;

    if (conversations.data.length || routes.data.length) {
      type Key = keyof typeof data;
      type Elem<T extends Key> = typeof data[T]['data'][number];

      const elems: JSX.Element[] = [];
      const keys = Object.keys(data) as Array<Key>;

      keys.map((key) => {
        const dataOfKey = data[key].data;

        dataOfKey.forEach((elem: Elem<typeof key>) => {
          if (key === 'conversations') {
            const { user, id } = elem as Elem<typeof key>;

            const { fullname } = user;

            const formatedFullname = Object.values(fullname).join(' ');

            elems.push(
              <Link
                href={`/inbox/${id}`}
                key={id}
                children={<ElementList content={formatedFullname} onClick={onSelect} user={user} />}
              />,
            );
          } else if (key === 'routes') {
            const { values, value } = elem as Elem<typeof key> & {
              values: string[];
              value: string;
            };

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
      });

      return elems;
    }

    return <p className={styles.info}>Not found</p>;
  };

  return (
    <div className={styles.list}>
      {inputValue.length ? (
        renderList(data)
      ) : (
        <p className={styles.info}>I will find what you need for you.</p>
      )}
    </div>
  );
};

export default List;
