export type props = {
  mini?: boolean;
  big?: boolean;
  extraStyle?: {
    size?: string;
    fontSize?: string;
    margin?: string;
  };
  member?: {
    fullname: {
      firstname: string;
      lastname: string;
    };
    colorImage?: string;
    image?: string;
  };
};

export type propsImage = {
    extraStyle?: {
    size?: string;
    fontSize?: string;
    margin?: string;
  };
  image?: string;
  colorImage?: string;
  big?: boolean;
  mini?: boolean;
};

export type ImageUserType = {
  colorImage?: string;
  image?: string;
  initials?: string;
};
