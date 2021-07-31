import { ChangeEventHandler, KeyboardEventHandler } from 'react';

import { Member } from 'interfaces';

export type props = {
  width?: string;
  id: string;
  getScopedUser: (user: Member) => void;
};

export type TextAreaHandle = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
};
