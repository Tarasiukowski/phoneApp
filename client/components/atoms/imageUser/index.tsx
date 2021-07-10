import { useEffect, useState } from 'react';

import { Image } from './styles';

import { props, DefaultMember } from './types';
import { useUser } from 'hooks';
import { getInitials } from 'utils';

const ImageUser = ({ member, ...restProps }: props) => {
  const user = useUser();

  if (user) {
    const {
      fullname: { firstname, lastname },
      colorImage: colorProfile,
      image: imageProfile,
    } = user;

    const [defaultMember, setDefaultMember] = useState<DefaultMember>({
      colorImage: colorProfile,
      image: imageProfile,
      initials: getInitials(firstname, lastname),
    });

    useEffect(() => {
      if (member) {
        const { fullname, image: imageProfile, colorImage: colorProfile } = member;

        const { firstname, lastname } = fullname;

        setDefaultMember({
          image: imageProfile,
          initials: getInitials(firstname, lastname),
          colorImage: colorProfile,
        });
      }
    }, [member]);

    const { colorImage, initials, image } = defaultMember;

    return (
      <Image image={image} colorImage={colorImage} {...restProps}>
        {!image && <p>{initials}</p>}
      </Image>
    );
  }

  return null;
};

export { ImageUser };
