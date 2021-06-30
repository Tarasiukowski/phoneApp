import { Member } from "../../../interfaces";

export type props = {
  width?: string;
  id: string;
  getScopedUser: (user: Member) => void;
};

export type Message = {
  content: string;
  from: string;
  id: string;
};
