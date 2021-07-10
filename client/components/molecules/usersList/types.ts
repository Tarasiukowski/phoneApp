import { Member } from 'interfaces';

export enum ListType {
  contacts = 'contacts',
  invites = 'invites',
}

export type props = {
  name: ListType;
  data: Member[];
};
