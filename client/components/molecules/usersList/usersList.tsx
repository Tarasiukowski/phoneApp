import { useState } from 'react';

import UserDetailed from '../../organisms/chatContent/userDetailed/userDetailed';
import UserCard from '../../atoms/userCard/userCard';

import styles from './usersList.module.scss';
import { SearchSvg } from '../../../public/svgs';
import { props } from './types';

const UsersList = ({ name, data }: props) => {
  const [DetailedUser, setDetailedUser] = useState<any | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const updateUserDetailed = (userData: any) => {
    const { firstname, lastname, color, image } = userData;

    const data = {
      member: {
        fullname: {
          firstname,
          lastname,
        },
        colorImage: color,
        image,
      },
    };

    setDetailedUser(data);
  };

  return (
    <>
      <div className={styles.template}>
        <div className={styles.header}>
          <p>{name}</p>
          <span>{data.length}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.inputTemplate}>
            <div>
              <SearchSvg />
            </div>
            <div>
              <input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                placeholder="Search"
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            {data
              .filter((elem) => {
                const { firstname, lastname } = elem;

                const fullnane = `${firstname} ${lastname}`;

                if (fullnane.startsWith(inputValue)) {
                  return elem;
                }
              })
              .map((elem) => {
                const { color, firstname, lastname, email, image } = elem;

                const propsUserCard = {
                  member: {
                    fullname: {
                      firstname,
                      lastname,
                    },
                    colorImage: color,
                    image,
                  },
                };

                return (
                  <div
                    onClick={() => updateUserDetailed(elem)}
                    key={email}
                    className={styles.listElement}
                  >
                    <UserCard {...propsUserCard} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {DetailedUser ? (
        <UserDetailed {...DetailedUser} />
      ) : (
        <UserDetailed
          member={{ fullname: { firstname: 'Michał', lastname: 'Tarasiuk' }, colorImage: 'red' }}
        />
      )}
    </>
  );
};

export default UsersList;
