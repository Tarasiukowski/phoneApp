import { ChangeEvent } from 'react';

export type props = {
  value?: string;
  onChange: (e: ChangeEvent) => void;
};
