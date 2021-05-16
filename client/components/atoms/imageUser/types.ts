export type props = {
  mini?: boolean;
  big?: boolean;
  size?: string;
  fontSize?: string;
  margin?: string;
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
  image?: string;
  colorImage?: string;
  fontSize?: string;
  size?: string;
  margin?: string;
  big?: boolean;
  mini?: boolean;
};
