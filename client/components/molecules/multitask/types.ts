export type props = {
  name: 'ChangeEmail';
  open: boolean;
  onEnd: (inputValue: string) => boolean | Promise<boolean>;
  onClose: (verifyCode?: boolean) => void;
  onNext: (inputValue: string) => boolean | Promise<boolean>;
};
