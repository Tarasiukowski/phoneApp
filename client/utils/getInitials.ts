export const getInitials = (firstname: string, lastname: string): string | null =>
  firstname && lastname ? `${firstname[0]}${lastname[0]}`.toUpperCase() : null;
