import { useState } from 'react';

import UserDetailed from '../../molecules/userDetailed/userDetailed';
import UserCard from '../../atoms/userCard/userCard';

import styles from './usersList.module.scss';
import { SearchSvg } from '../../../public/svgs';
import { User } from '../../../interfaces';
import { props } from './types';

const UsersList = ({ name, data, defaultDetailedUser }: props) => {
  const [detailedUser, setDetailedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const updateUserDetailed = (userData: User) => {
    setDetailedUser(userData);
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
                const {
                  fullname: { firstname, lastname },
                } = elem;

                const fullnane = `${firstname} ${lastname}`;

                if (fullnane.startsWith(inputValue)) {
                  return elem;
                }
              })
              .map((elem) => {
                return (
                  <div
                    onClick={() => updateUserDetailed(elem)}
                    key={elem.number}
                    className={styles.listElement}
                  >
                    <UserCard member={elem} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {detailedUser ? (
        <UserDetailed {...detailedUser} />
      ) : (
        <UserDetailed {...defaultDetailedUser} />
      )}
    </>
  );
};

export default UsersList;
