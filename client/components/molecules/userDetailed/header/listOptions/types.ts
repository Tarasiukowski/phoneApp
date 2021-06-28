import { RefObject } from 'react';

export type props = {
  listOptionsRef: RefObject<HTMLDivElement>;
  open: boolean;
  email?: string
};
