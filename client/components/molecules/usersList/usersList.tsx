import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserDetailed from '../../molecules/userDetailed/userDetailed';
import UserCard from '../../atoms/userCard/userCard';

import styles from './usersList.module.scss';
import { SearchSvg, PlusSvg } from '../../../public/svgs';
import { User } from '../../../interfaces';
import { props } from './types';
import { fetcher } from '../../../utils';
import { selectUser } from '../../../reducers/userReducer';
import { add } from '../../../reducers/friendsReducer';
import { remove } from '../../../reducers/invitesReducer';

const UsersList = ({ name, data, defaultDetailedUser }: props) => {
  const [detailedUser, setDetailedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const dispatch = useDispatch();
  const { email } = useSelector(selectUser);

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
                const addUser = () => {
                  dispatch(remove({ email: elem.email }));
                  dispatch(add({ user: elem }));

                  fetcher('POST', 'user/invite/accept', {
                    email,
                    from: elem.email,
                  });
                };

                return (
                  <div
                    onClick={() => updateUserDetailed(elem)}
                    key={elem.number}
                    className={styles.listElement}
                  >
                    <UserCard member={elem} />
                    {name === 'invites' && (
                      <div onClick={addUser} className={styles.svgTemplate}>
                        <PlusSvg />
                      </div>
                    )}
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
