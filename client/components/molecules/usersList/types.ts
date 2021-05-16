import { User } from "../../../interfaces";

export type props = {
  name: 'contacts' | 'invites';
  data: User[];
  defaultDetailedUser: User
};
