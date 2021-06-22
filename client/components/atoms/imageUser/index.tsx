import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Image } from './styles';

import { props, DefaultMember } from './types';
import { selectUser } from '../../../reducers/userReducer';
import { getInitials } from '../../../utils';

const ImageUser = ({ member, ...restProps }: props) => {
  const [defaultMember, setDefaultMember] = useState<DefaultMember>({
    colorImage: undefined,
    image: undefined,
    initials: undefined,
  });

  const user = useSelector(selectUser);

  useEffect(() => {
    if (member) {
      const { fullname, image: profileImage, colorImage } = member;

      const { firstname, lastname } = fullname as { firstname: string; lastname: string };

      setDefaultMember({
        image: profileImage,
        initials: getInitials(firstname, lastname),
        colorImage,
      });
    } else {
      if (user) {
        const {
          fullname: { firstname, lastname },
          colorImage,
          image: imageProfile,
        } = user;

        setDefaultMember({
          image: imageProfile,
          initials: getInitials(firstname, lastname),
          colorImage,
        });
      }
    }
  }, [member]);

  const { colorImage, initials, image } = defaultMember;

  return (
    <Image image={image} colorImage={colorImage} {...restProps}>
      {!image && <p>{initials}</p>}
    </Image>
  );
};

export { ImageUser };
