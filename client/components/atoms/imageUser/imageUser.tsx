import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { props } from './types';
import { selectUser } from '../../../reducers/userReducer';

const ImageUser = ({ fullname, color, ...props }: props) => {
  const user = useSelector(selectUser);

  if (!color && user) {
    const { color: colorImage } = user;

    color = colorImage;
  }

  if (!fullname && user) {
    const { firstname, lastname } = user;

    fullname = { firstname, lastname };
  } else {
    fullname = {
      firstname: null,
      lastname: null,
    };
  }

  const { firstname, lastname } = fullname;

  const initials = firstname && lastname ? `${firstname[0]}${lastname[0]}` : null;

  return (
    <Image color={color} {...props}>
      <p>{initials}</p>
    </Image>
  );
};

const Image = styled.div<props>`
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  pointer-events: none;
  cursor: default;
  margin: ${({ margin }) => margin};

  p {
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
  }

  ${({ size }) =>
    size &&
    css`
      width: ${size};
      height: ${size};
    `}

  ${({ fontSize }) =>
    fontSize &&
    css`
      p {
        font-size: ${fontSize};
      }
    `}

  ${({ big }) =>
    big &&
    css`
      width: 40px;
      height: 40px;

      p {
        font-size: 1.4rem;
      }
    `}

  ${({ mini }) =>
    mini &&
    css`
      width: 20px;
      height: 20px;

      p {
        font-size: 0.7rem;
      }
    `}
`;

export default ImageUser;
