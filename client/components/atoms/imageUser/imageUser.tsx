import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { props } from './types';
import { selectUser } from '../../../reducers/userReducer';

const ImageUser = ({ fullname, colorImage, ...props }: props) => {
  let splitedFullname;
  let initials = '';

  if (!fullname) {
    const user = useSelector(selectUser);

    if (user) {
      const { fullname, color } = user;

      colorImage = color;

      splitedFullname = fullname.split(' ');

      initials = `${splitedFullname[0][0]}${splitedFullname[1][0]}`.toUpperCase();
    }
  } else {
    splitedFullname = Object.values(fullname);

    initials = `${splitedFullname[0][0]}${splitedFullname[1][0]}`.toUpperCase();
  }

  return (
    <Image colorImage={colorImage} {...props}>
      <p>{initials}</p>
    </Image>
  );
};

const Image = styled.div<props>`
  background-color: ${({ colorImage }) => colorImage};
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
