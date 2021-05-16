export const getInitials = (firstname: string, lastname: string) =>
  `${firstname[0]}${lastname[0]}`.toUpperCase();
