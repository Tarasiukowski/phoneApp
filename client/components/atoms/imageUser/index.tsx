import { useEffect, useState } from 'react';

import { Image } from './styles';

import { props, DefaultMember } from './types';
import { useUser } from 'setup/reducers/userReducer';
import { getInitials } from 'utils';

const ImageUser = ({ member, ...restProps }: props) => {
  const [imageData, setImageData] = useState<DefaultMember>({
    colorImage: undefined,
    image: undefined,
    initials: undefined,
  });

  const user = useUser();

  useEffect(() => {
    if (user) {
      const {
        fullname: { firstname, lastname },
        colorImage: colorProfile,
        image: imageProfile,
      } = member ? member : user;

      setImageData({
        image: imageProfile,
        initials: getInitials(firstname, lastname),
        colorImage: colorProfile,
      });
    }
  }, [member, user]);

  const { colorImage, initials, image } = imageData;

  return (
    <Image image={image} colorImage={colorImage} {...restProps}>
      {!image && <p>{initials}</p>}
    </Image>
  );
};

export { ImageUser };
