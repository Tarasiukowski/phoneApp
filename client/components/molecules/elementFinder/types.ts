import { ReactNode } from 'react';

export type props<T> = {
  data: T[],
  filterKey: keyof T,
  renderList: (data: T[]) => ReactNode;
  info: string
};
