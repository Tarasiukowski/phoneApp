export type props = {
  email?: string;
  number?: string;
  member: {
    fullname: {
      firstname: string;
      lastname: string;
    };
    image?: string;
    colorImage?: string;
  };
};
