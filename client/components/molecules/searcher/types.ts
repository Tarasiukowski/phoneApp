import { DetailedConversation } from 'interfaces';

export type props = {
  open: boolean;
  onClose: () => void;
};

export type Route =
  | { filterValue: string; value: string; href: string }
  | { filterValue: string; values: string[] };

export type SearchData = {
  routes: {
    data: Route[];
  };
  conversations: {
    data: DetailedConversation[];
  };
};
