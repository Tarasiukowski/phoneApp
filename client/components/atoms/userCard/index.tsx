import { useEffect, useRef, useState, forwardRef, useCallback } from 'react';

import { ImageUser } from '../index';
import { Template } from './styles';
import UserDetailed from './userDetailed/userDetailed';

import { props } from './types';
import { useOutsideClick } from 'hooks';
import { useUser } from 'setup/reducers/userReducer';
import { formatValuesObject } from 'utils';

const UserCard = forwardRef<HTMLDivElement, props>(
  ({ elemList, member, big, withDetailed, onClick }, ref) => {
    const [fullname, setFullname] = useState('');
    const [openDetailed, setOpenDetailed] = useState(false);

    const templateRef = useRef<HTMLDivElement>(null);
    const userDetailedRef = useRef<HTMLDivElement>(null);

    const user = useUser();

    const handleOnClick = useCallback(() => {
      withDetailed && setOpenDetailed(true);
      onClick && onClick();
    }, []);

    useOutsideClick(
      templateRef,
      () => {
        setOpenDetailed(false);
      },
      (target, defaultOption) => defaultOption || target.tagName === 'BUTTON',
      { isListeningForEvent: openDetailed && withDetailed },
    );

    useEffect(() => {
      if (user) {
        const { fullname } = member ? member : user;

        const formatedFullname = formatValuesObject(fullname);

        setFullname(formatedFullname);
      }
    }, []);

    return (
      <Template
        onClick={withDetailed ? handleOnClick : onClick}
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
