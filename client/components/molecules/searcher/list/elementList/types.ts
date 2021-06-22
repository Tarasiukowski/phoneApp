import { User } from "../../../../../interfaces";

export type props = {
  content: string;
  onClick: () => void;
  user?: User
}