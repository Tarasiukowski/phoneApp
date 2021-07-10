import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ElementList from './elementList';
import { UserDetailed } from '../index';

import { SearchSvg } from '../../../public/svgs';
import { Member } from 'interfaces';
import { props } from './types';
import { fetcher, filterByKey, handleRequestError } from 'utils';
import { add } from 'setup/reducers/friendsReducer';
import { remove } from 'setup/reducers/invitesReducer';
import { useError } from 'contexts';
import styles from './usersList.module.scss';

const UsersList = ({ name, data }: props) => {
  const [detailedUser, setDetailedUser] = useState<Member | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [listData, setListData] = useState<Member[]>([]);

  const dispatch = useDispatch();

  const { setError } = useError();

  useEffect(() => {
    if (data) {
      setDetailedUser(data[0]);
    }
  }, []);

  useEffect(() => {
    setListData(data);
  }, [data]);

  useEffect(() => {
    const userExist = data.find(({ email }) => email === detailedUser?.email);

    if (!userExist && data.length) {
      setDetailedUser(data[0]);
    } else {
      setDetailedUser(null);
    }
  }, [data.length]);

  useEffect(() => {
    if (inputValue.length) {
      const filteredData = filterByKey(listData, inputValue, 'fullname');

      setListData(filteredData);
    } else {
      setListData(data);
    }
  }, [inputValue]);

  const updateUserDetailed = useCallback((userData: Member) => {
    setDetailedUser(userData);
  }, []);

  const acceptInvite = useCallback(async (user: Member) => {
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

      dispatch(remove({ by: 'email', value: user.email }));
      dispatch(add({ user: { ...user, notes: [] } }));

      setDetailedUser(null);
    } catch (err) {
      handleRequestError(err, (errorMsg) => {
        setError({ msg: errorMsg, id: Math.random() });
      });
    }
  }, []);

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
