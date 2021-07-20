import { PayloadAction } from '@reduxjs/toolkit';

import { Member } from 'interfaces/index';

type Key = keyof Member;

export type Reducers = {
  update(state: Member[], { payload }: PayloadAction<Member[]>): Member[];
  remove<K extends Key>(
    state: Member[],
    { payload }: PayloadAction<{ by: K; value: Member[K] }>,
  ): Member[];
};
