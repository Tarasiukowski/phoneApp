import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { props, propsImage, DefaultMember } from './types';
import { selectUser } from '../../../reducers/userReducer';
import { getInitials } from '../../../utils';

const ImageUser = ({ member, ...restProps }: props) => {
  let defaultMember: DefaultMember = {
    colorImage: null,
    image: null,
    initials: null,
  };

  const user = useSelector(selectUser);

  if (!member) {
    if (user) {
      const {
        fullname: { firstname, lastname },
        colorImage,
        image: imageProfile,
      } = user;

      defaultMember = {
        colorImage,
        image: imageProfile ? imageProfile : null,
        initials: getInitials(firstname, lastname),
      };
    }
  } else {
    const { fullname, image: profileImage, colorImage } = member;

    const { firstname, lastname } = fullname ? fullname : user.fullname;

    defaultMember = {
      image: profileImage,
      initials: getInitials(firstname, lastname),
      colorImage,
    };
  }

  const { colorImage, initials, image } = defaultMember;

  return (
    <Image image={image} colorImage={colorImage} {...restProps}>
      {!image && <p>{initials}</p>}
    </Image>
  );
};

const Image = styled.div<propsImage>`
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

export { ImageUser } 