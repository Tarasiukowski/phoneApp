export type props = {
  name: 'ChangeEmail' | 'InviteFriend' | 'CreateGroup';
  open: boolean;
  onEnd: (data: any) => boolean | Promise<boolean>;
  onClose: (verifyCode?: boolean) => void;
  onNext?: (inputValue: string, counterStage: number) => boolean | Promise<boolean>;
};

export type GroupData = { name?: string | null; members?: string[] };
