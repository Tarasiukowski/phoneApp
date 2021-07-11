import { DetailedConversation } from 'interfaces';

export enum SearchType {
  conversation = 'conversation',
  route = 'route',
}

export type props = {
  open: boolean;
  onClose: () => void;
};

type Route = {
  filterValue: string;
  href?: string;
  hrefs?: string[];
};

export type SearchData = {
  routes: {
    data: (Route & { type: SearchType.route })[];
  };
  conversations: {
    data: (DetailedConversation & { type: SearchType.conversation })[];
  };
};
