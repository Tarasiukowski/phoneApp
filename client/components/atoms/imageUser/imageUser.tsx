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

  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
  }

  ${({ mini }) => mini && css`
    width: 20px;
    height: 20px;
    margin-left: 13px;

    p {
      font-size: .7rem;
    }
  `}
`;

const ImageUser = ({ mini }: propsImageUser) => (
  <Image mini={mini}>
    <p>MT</p>
  </Image>
);

export default ImageUser;
