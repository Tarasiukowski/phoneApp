import { FunctionComponent } from 'react';

export type props = { routes: route[]; slugNumber: number };

export type route = {
  slug: string;
  component: FunctionComponent;
};
