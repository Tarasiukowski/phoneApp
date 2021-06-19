import { ChatData } from '../../organisms/groupContent/types';

export type props = {
  width?: string;
  id: string;
  onFetchData: (chatData: ChatData) => void;
};

export type Message = {
  content: string;
  from: string;
  id: string;
};
