import styled, { css } from 'styled-components';
import ImageUser from '../imageUser/imageUser';
import { propsUserCard } from '../../../interfaces';

const UserCard = ({ friend }: propsUserCard) => {
  return (
    <Template friend={friend}>
      <ImageUser mini={friend} />
      <p className="name">Michał Tarasiuk</p>
    </Template>
  );
};

export const Template = styled.div<propsUserCard>`
  width: 90%;
  height: 38px;
  margin: 10px 0 12px 0;
  border-radius: 5px;
  border: none !important;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .name {
    color: rgb(238, 238, 240);
    font-size: 14px;
    font-weight: 600;
    margin-left: 9px;
  }

  :hover {
    background-color: #4b4b663b;
  }

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
