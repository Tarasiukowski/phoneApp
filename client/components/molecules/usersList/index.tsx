import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ElementList from './elementList';
import { UserDetailes } from '../index';

import { SearchSvg } from '../../../public/svgs';
import { Member } from 'interfaces';
import { props } from './types';
import { filterByKey, handleRequestError, acceptInvite } from 'utils';
import { add } from 'setup/reducers/friendsReducer';
import { remove } from 'setup/reducers/invitesReducer';
import { useError } from 'contexts';
import styles from './usersList.module.scss';
import { useDidMount } from 'hooks';

const UsersList = ({ name, data }: props) => {
  const [detailedUser, setDetailedUser] = useState<Member | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [listData, setListData] = useState<Member[]>([]);

  const dispatch = useDispatch();

  const { setError } = useError();

  useDidMount(() => {
    const firstMemberOfData = data[0];

    setDetailedUser(firstMemberOfData ? firstMemberOfData : null);
  });

  useEffect(() => {
    setListData(data);
  }, [data]);

  useEffect(() => {
    if (inputValue.length) {
      const filteredData = filterByKey('fullname', listData, inputValue);

      setListData(filteredData);
    } else {
      setListData(data);
    }
  }, [inputValue]);

  const updateUserDetailed = useCallback((member: Member) => {
    setDetailedUser(member);
  }, []);

  const handleAcceptInvite = useCallback(async (user: Member) => {
    try {
      await acceptInvite(user.email);

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
                onClick={() => updateUserDetailed(user)}
                onAcceptInvite={handleAcceptInvite}
                user={user}
                name={name}
                key={user.email}
              />
            ))}
          </div>
        </div>
      </div>
      <UserDetailes name={name} loading={detailedUser ? false : true} email={detailedUser?.email} />
    </>
  );
};

export { UsersList };
