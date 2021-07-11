import { FunctionComponent } from 'react';

import { SearchData } from '../../types';

export type props = {
  data: SearchData;
  onSelect: () => void;
  notFound: FunctionComponent;
};

export type ReceivedData = (
  | SearchData['conversations']['data'][number]
  | SearchData['routes']['data'][number]
)[];
