import { PayloadAction } from '@reduxjs/toolkit';

import { User } from 'interfaces';

export type Key = keyof User;

export type PayloadValue<K extends Key> = {
  key: Key;
  value: User[K] extends Array<any> ? User[K][number] : User[K];
  option: User[K] extends Array<any> ? { type: 'pull' | 'push' } : undefined;
};

export type Reducres = {
  update<K extends Key>(
    state: User | null,
    { payload }: PayloadAction<PayloadValue<'groups'>>,
  ): User | null;
  login(state: User | null, { payload }: PayloadAction<User>): User;
};
