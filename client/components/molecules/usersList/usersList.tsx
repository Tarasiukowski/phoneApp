import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserDetailed from '../../organisms/chatContent/userDetailed/userDetailed';
import UserCard from '../../atoms/userCard/userCard';

import styles from './usersList.module.scss';
import { SearchSvg } from '../../../public/svgs';
import { props } from './types';
import { selectUser } from '../../../reducers/userReducer';
import { fetcher } from '../../../utils';
import { selectInvites, update } from '../../../reducers/invitesReducer';
import { Invite } from '../../../interfaces';

const UsersList = ({ name }: props) => {
  const [userDetailed, setUserDetailed] = useState<Invite | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const { email } = useSelector(selectUser);
  const invites = useSelector(selectInvites);

  const dispatch = useDispatch();

  useEffect(() => {
    if (name === 'invites') {
      fetcher('POST', 'user/invite/get', {
        email,
      }).then((invites) => {
        invites.length ? setUserDetailed(invites[0]) : null;

        dispatch(update(invites));
      });
    } else if (name === 'contacts') {
      fetcher('POST', 'user/friends', {
        email,
      }).then((friends) => {
        friends.length ? setUserDetailed(friends[0]) : null;

        console.log(friends)
      });
    }
  }, []);

  const updateUserDetailed = (userData: Invite) => {
    setUserDetailed(userData);
  };

  return (
    <>
      <div className={styles.template}>
        <div className={styles.header}>
          <p>{name}</p>
          <span>{name === 'invites' ? invites.length : 0}</span>
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
            {name === 'invites' &&
              invites
                .filter((invite) => {
                  const { firstname, lastname } = invite;

                  const fullnane = `${firstname} ${lastname}`;

                  if (fullnane.startsWith(inputValue)) {
                    return invites;
                  }
                })
                .map((invite) => {
                  const { color, firstname, lastname, email, image } = invite;

                  const propsUserCard = {
                    fullname: {
                      firstname,
                      lastname,
                    },
                    colorImage: color,
                    image: image ? image : undefined,
                  };

                  return (
                    <div
                      onClick={() => updateUserDetailed(invite)}
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
      <UserDetailed {...userDetailed} />
    </>
  );
};

export default UsersList;
