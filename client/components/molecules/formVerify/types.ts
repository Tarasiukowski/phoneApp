export enum TypeVerify {
  login = 'login',
  account = 'account',
}

export type props = {
  type: TypeVerify;
  onSuccess: () => void;
};
