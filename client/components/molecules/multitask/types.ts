export type props = {
  name: 'ChangeEmail' | 'InviteFriend';
  open: boolean;
  onEnd: (inputValue: string) => boolean | Promise<boolean>;
  onClose: (verifyCode?: boolean) => void;
  onNext?: (inputValue: string) => boolean | Promise<boolean>;
};
