import { RequireChildren } from 'interfaces';

export type props = RequireChildren;

export type Handle = {
  name: 'ChangeEmail' | 'InviteFriend' | 'CreateGroup';
  onEnd: (data: any) => boolean | Promise<boolean>;
  onClose: (verifyCode?: boolean) => void;
  onNext?: (inputValue: string, counterStage: number) => boolean | Promise<boolean>;
};

export type ToggleOpen = <V extends boolean>(
  value: V,
  handle?: V extends true ? Handle : undefined,
) => void;

export type multiTaskContext = {
  open: boolean;
  toggleOpen: ToggleOpen;
  handle?: Handle;
};
