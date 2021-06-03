import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserDetailed from '../../molecules/userDetailed/userDetailed';
import UserCard from '../../atoms/userCard/userCard';

import styles from './usersList.module.scss';
import { SearchSvg, PlusSvg } from '../../../public/svgs';
import { User, Error } from '../../../interfaces';
import { props } from './types';
import { fetcher } from '../../../utils';
import { selectUser } from '../../../reducers/userReducer';
import { add } from '../../../reducers/friendsReducer';
import { remove } from '../../../reducers/invitesReducer';
import Alert from '../../atoms/alert/alert';

const UsersList = ({ name, data }: props) => {
  const [detailedUser, setDetailedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [listData, setListData] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch();
  const { email } = useSelector(selectUser);

  useEffect(() => {
    if (data) {
      setDetailedUser(data[0]);
    }

    setListData(data);
  }, []);

  useEffect(() => {
    setListData(data);
  }, [data]);

  useEffect(() => {
    if (inputValue.length) {
      const filterData = (data: User[]) =>
        data.filter((elem) => {
          const {
            fullname: { firstname, lastname },
          } = elem;

          const fullnane = `${firstname} ${lastname}`.toLowerCase();

          if (fullnane.startsWith(inputValue.toLowerCase())) {
            return elem;
          }
        });

      const filteredData = filterData(listData);

      setListData(filteredData);
    } else {
      setListData(data);
    }
  }, [inputValue]);

  const updateUserDetailed = (userData: User) => {
    setDetailedUser(userData);
  };

  const addUser = async (user: User) => {
    const { error, errorMsg } = await fetcher('POST', '/user/invite/accept', {
      email,
      from: user.email,
    });

    if (error) {
      setError({ msg: errorMsg, id: Math.random() });
      return;
    }

    const filteredData = listData.filter((user) => {
      const { email } = user;

      if (email !== user.email) {
        return user;
      }
    });

    setListData(filteredData);

    dispatch(remove({ email: user.email }));
    dispatch(add({ user: user }));
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
            {listData.map((user) => {
              return (
                <div
                  onClick={() => updateUserDetailed(user)}
                  key={user.number}
                  className={styles.listElement}
                >
                  <UserCard member={user} />
                  {name === 'invites' && (
                    <div onClick={() => addUser(user)} className={styles.svgTemplate}>
                      <PlusSvg />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Alert error={error} />
      <UserDetailed loading={detailedUser ? false : true} {...detailedUser} />
    </>
  );
};

export default UsersList;
