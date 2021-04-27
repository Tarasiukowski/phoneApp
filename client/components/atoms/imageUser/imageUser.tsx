import styled, { css } from 'styled-components';
import { propsImageUser } from '../../../interfaces';

const Image = styled.div<propsImageUser>`
  background-color: #9c5ab6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin-left: 9px;
  pointer-events: none;

  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
  }

  ${({ big }) =>
    big &&
    css`
      width: 40px;
      height: 40px;
      margin-left: 12px;
      cursor: default;

      p {
        font-size: 1.4rem;
      }
    `}

  ${({ mini }) =>
    mini &&
    css`
      width: 20px;
      height: 20px;
      margin-left: 13px;

      p {
        font-size: 0.7rem;
      }
    `}

  ${({ customized }) =>
    customized &&
    css`
      width: 90%;
      height: 90%;
      margin: 0;

      p {
        font-size: 3rem;
      }
    `}
`;

const ImageUser = ({ ...props }: propsImageUser) => (
  <Image {...props}>
    <p>MT</p>
  </Image>
);

export default ImageUser;
