import { ReactNode } from 'react';

export type props<T> = {
  data: T[],
  filterKey: keyof T,
  renderItem: (data: T) => ReactNode;
  notFound: string
  placeholder: string
};
