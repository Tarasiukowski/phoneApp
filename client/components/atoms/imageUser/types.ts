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
  image?: string | null | undefined;
  colorImage?: string | null | undefined;
  fontSize?: string;
  size?: string;
  margin?: string;
  big?: boolean;
  mini?: boolean;
};

export type DefaultMember = {
  colorImage: string | null | undefined;
  image: string | null | undefined;
  initials: string | null;
};
