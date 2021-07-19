import { RequireChildren } from "interfaces";

export type props = RequireChildren

export type loadingContext = {
  loading: boolean;
  toggleLoading: (value: boolean) => void;
};
