import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ElementList from './elementList';
import { UserDetailed } from '../index';

import { SearchSvg } from '../../../public/svgs';
import { User } from '../../../interfaces';
import { props } from './types';
import { fetcher, filterByKey } from '../../../utils';
import { add } from '../../../reducers/friendsReducer';
import { remove } from '../../../reducers/invitesReducer';
import { ErrorContext } from '../../../contexts';
import styles from './usersList.module.scss';

const UsersList = ({ name, data }: props) => {
  const [detailedUser, setDetailedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [listData, setListData] = useState<User[]>([]);

  const dispatch = useDispatch();

  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    if (data) {
      setDetailedUser(data[0]);
    }
  }, []);

  useEffect(() => {
    setListData(data);
  }, [data]);

  useEffect(() => {
    if (inputValue.length) {
      const filteredData = filterByKey(listData, inputValue, 'fullname');

      setListData(filteredData);
    } else {
      setListData(data);
    }
  }, [inputValue]);

  const updateUserDetailed = (userData: User) => {
    setDetailedUser(userData);
  };

  const acceptInvite = async (user: User) => {
    try {
      await fetcher('POST', '/user/invite/accept', {
        from: user.email,
      });

      const filteredData = listData.filter((user) => {
        const { email } = user;

        if (email !== user.email) {
          return user;
        }
      });

      setListData(filteredData);

      dispatch(remove({ email: user.email }));
      dispatch(add({ user: user }));
    } catch (err) {
      const { errorMsg } = err.response.data;

      setError({ msg: errorMsg, id: Math.random() });
      return;
    }
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
            {listData.map((user) => (
              <ElementList
                onClick={updateUserDetailed}
                onAcceptInvite={acceptInvite}
                user={user}
                name={name}
                key={user.email}
              />
            ))}
          </div>
        </div>
      </div>
      <UserDetailed loading={detailedUser ? false : true} {...detailedUser} />
    </>
  );
};

export { UsersList };
