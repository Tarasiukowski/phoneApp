import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import ImageUser from '../imageUser/imageUser';
import UserDetailed from './userDetailed/userDetailed';

import { props } from './types';
import { getAllChildreenOfElement } from '../../../utils';
import { selectUser } from '../../../reducers/userReducer';

const UserCard = ({ friend, big, withDetailed }: props) => {
  const [openDetailed, setOpenDetailed] = useState<boolean>(false);

  const templateRef = useRef<HTMLDivElement>(null);
  const userDetailedRef = useRef<HTMLDivElement>(null);

  let fullname = '';

  const user = useSelector(selectUser);

  if (user) {
    const { firstname, lastname } = user;

    fullname = `${firstname} ${lastname}`;
  }

  if (withDetailed) {
    useEffect(() => {
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
    });
  }

  return (
    <Template friend={friend} big={big} ref={templateRef}>
      <ImageUser margin={friend ? '0 0 0 13px' : '0 0 0 9px'} mini={friend} big={big} />
      <p className="name">{fullname}</p>
      {withDetailed && openDetailed && <UserDetailed userDetailedRef={userDetailedRef} />}
    </Template>
  );
};

export const Template = styled.div<props>`
  width: 90%;
  height: 38px;
  margin: 10px 0 12px 0;
  border-radius: 5px;
  border: none !important;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  .name {
    color: rgb(238, 238, 240);
    font-size: 14px;
    font-weight: 600;
    margin-left: 9px;
    pointer-events: none;
  }
  :hover {
    background-color: #4b4b663b;
  }

  ${({ big }) =>
    big &&
    css`
      margin: 0;
      width: 100%;
      height: 70px;
      cursor: default;

      .name {
        margin-left: 13px;
      }

      :hover {
        background-color: transparent;
      }
    `}

  ${({ friend }) =>
    friend &&
    css`
      width: 93%;
      height: 30px;
      background-color: #4b4b663b;
      margin: 2px;

      .name {
        font-size: 12px;
        margin-left: 16px;
      }

      :hover {
        background-color: #2f3043;
      }
    `}
`;

export default UserCard;
