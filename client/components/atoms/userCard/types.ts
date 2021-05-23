export type props = {
  href?: string,
  elemList?: boolean;
  big?: boolean;
  withDetailed?: boolean;
  member?: {
    fullname: {
      firstname: string;
      lastname: string;
    };
    colorImage?: string;
    image?: string;
  };
  onClick?: () => void
};
