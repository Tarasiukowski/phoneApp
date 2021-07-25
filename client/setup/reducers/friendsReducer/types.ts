import { PayloadAction } from '@reduxjs/toolkit';

import { Member } from 'interfaces/index';

export type Key = keyof Member;

export type Reducers = {
  updateOne<K extends Key>(
    state: Member[],
    {
      payload,
    }: PayloadAction<{
      email: string;
      key: K;
      value: Member[K] extends Array<any> ? Member[K][number] : Member[K];
    }>,
  ): Member[];
  update(_: Member[], { payload }: PayloadAction<Member[]>): void;
  remove<K extends Key>(
    state: Member[],
    {
      payload,
    }: PayloadAction<{
      by: K;
      value: Member[K];
    }>,
  ): Member[];
  add(
    state: Member[],
    {
      payload,
    }: PayloadAction<{
      user: Member;
    }>,
  ): Member[];
};
