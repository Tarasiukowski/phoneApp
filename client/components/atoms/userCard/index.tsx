import { useEffect, useRef, useState, forwardRef } from 'react';
import { useSelector } from 'react-redux';

import { ImageUser } from '../index';
import { Template } from './styles';
import UserDetailed from './userDetailed/userDetailed';

import { props } from './types';
import { getAllChildreenOfElement } from '../../../utils';
import { selectUser } from '../../../reducers/userReducer';

const UserCard = forwardRef<HTMLDivElement, props>(
  ({ elemList, member, big, withDetailed, onClick }, ref) => {
    const [fullname, setFullname] = useState('');
    const [openDetailed, setOpenDetailed] = useState(false);

    const templateRef = useRef<HTMLDivElement>(null);
    const userDetailedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (member) {
        const { fullname } = member;
        const { firstname, lastname } = fullname;

        setFullname(`${firstname} ${lastname}`);
      } else {
        const user = useSelector(selectUser);

        if (user) {
          const {
            fullname: { firstname, lastname },
          } = user;

          setFullname(`${firstname} ${lastname}`);
        }
      }
    }, [member]);

    useEffect(() => {
      if (withDetailed) {
        const handleClickEvent = (e: Event) => {
          const target = e.target as HTMLElement;
          const userDetailedRefCurrent = userDetailedRef.current;

          const allowElements: HTMLElement[] = userDetailedRefCurrent
            ? getAllChildreenOfElement(userDetailedRefCurrent)
            : [];

          if (templateRef.current === target) {
            setOpenDetailed(true);
          } else if (!allowElements.includes(target)) {
            setOpenDetailed(false);
          }
        };

        window.addEventListener('click', handleClickEvent);
      }
    });

    return (
      <Template
        onClick={onClick}
        elemList={elemList}
        big={big}
        ref={withDetailed ? templateRef : ref}
      >
        <ImageUser
          member={member}
          extraStyle={{ margin: elemList ? '0 0 0 13px' : '0 0 0 9px' }}
          mini={elemList}
          big={big}
        />
        <p className="name">{fullname}</p>
        {withDetailed && openDetailed && <UserDetailed userDetailedRef={userDetailedRef} />}
      </Template>
    );
  },
);

export { UserCard };
