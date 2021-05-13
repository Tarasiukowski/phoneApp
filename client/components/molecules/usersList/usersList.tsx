import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserDetailed from '../../organisms/chatContent/userDetailed/userDetailed';
import UserCard from '../../atoms/userCard/userCard';

import styles from './usersList.module.scss';
import { SearchSvg } from '../../../public/svgs';
import { props } from './types';
import { selectUser } from '../../../reducers/userReducer';
import { fetcher } from '../../../utils';
import { selectInvites, update } from '../../../reducers/invitesReducer';

const UsersList = ({ name }: props) => {
  const { email } = useSelector(selectUser);
  const invites = useSelector(selectInvites);

  const dispatch = useDispatch();

  useEffect(() => {
    if (name === 'invites') {
      fetcher('POST', 'user/invite/get', {
        email,
      }).then((invites) => {
        dispatch(update(invites));
      });
    }
  }, []);

  return (
    <>
      <div className={styles.template}>
        <div className={styles.header}>
          <p>{name}</p>
          <span>{name === "invites" ? invites.length : 0}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.inputTemplate}>
            <div>
              <SearchSvg />
            </div>
            <div>
              <input placeholder="Search" autoComplete="off" />
            </div>
          </div>
          <div>
            {name === "invites" && invites.map((invite) => {
              const { color, firstname, lastname, email } = invite;

              const propsUserCard = {
                fullname: {
                  firstname,
                  lastname,
                },
                colorImage: color,
              };

              return (
                <div className={styles.listElement}>
                  <UserCard key={email} {...propsUserCard} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <UserDetailed />
    </>
  );
};

export default UsersList;
