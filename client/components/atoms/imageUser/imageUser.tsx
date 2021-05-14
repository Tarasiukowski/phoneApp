import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { props } from './types';
import { selectUser } from '../../../reducers/userReducer';

const ImageUser = ({ fullname, image, colorImage, ...props }: props) => {
  let splitedFullname;
  let initials = '';

  if (!fullname) {
    const user = useSelector(selectUser);

    if (user) {
      const { fullname, color, image: imageProfile } = user;

      colorImage = color;

      imageProfile ? (image = imageProfile) : null;

      splitedFullname = fullname.split(' ');

      initials = `${splitedFullname[0][0]}${splitedFullname[1][0]}`.toUpperCase();
    }
  } else {
    splitedFullname = Object.values(fullname);

    initials = `${splitedFullname[0][0]}${splitedFullname[1][0]}`.toUpperCase();
  }

  return (
    <Image image={image} colorImage={colorImage} {...props}>
      {!image && <p>{initials}</p>}
    </Image>
  );
};

const Image = styled.div<props>`
  background-color: ${({ colorImage, image }) => (!image ? colorImage : null)};
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

  ${({ image }) =>
    image &&
    css`
    background-image: url(${image});
    background-size cover;
    background-position: center;
  `}

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
