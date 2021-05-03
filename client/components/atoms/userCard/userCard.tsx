import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import ImageUser from '../imageUser/imageUser';
import UserDetailed from './userDetailed/userDetailed';

import { props } from './types';

const UserCard = ({ friend, big, withDetailed }: props) => {
  const [openDetailed, setOpenDetailed] = useState<boolean>(false);

  const templateRef = useRef<HTMLDivElement>(null);
  const userDetailedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', (e: Event) => {
      const target = e.target;

      if (templateRef.current === target) {
        setOpenDetailed(true);
      } else {
        setOpenDetailed(false);
      }
    });
  });

  return (
    <Template friend={friend} big={big} ref={templateRef}>
      <ImageUser margin={friend ? '0 0 0 13px' : '0 0 0 9px'} mini={friend} big={big} />
      <p className="name">Michał Tarasiuk</p>
      {withDetailed && openDetailed && <UserDetailed ref={userDetailedRef} />}
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
