import { User } from 'interfaces';

export type Message = {
  content: string;
  from: string;
  id: string;
};

export type ChatData = {
  user: User | null;
  messages: Message[];
};
