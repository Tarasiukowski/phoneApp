import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Member } from '../interfaces';
import { RootState } from '../store';

const blocklistSlice = createSlice({
  name: 'blocklist',
  initialState: [] as Member[],
  reducers: {
    update(_, { payload }: PayloadAction<Member[]>) {
      return payload;
    },
    remove(state, { payload }: PayloadAction<{ email: string }>) {
      const { email } = payload;

      const updatedState = state.filter((user) => {
        if (user.email !== email) {
          return user;
        }
      });

      return [...updatedState];
    },
  },
});

export const { update, remove } = blocklistSlice.actions;

export const selectBlocklist = (state: RootState) => state.blocklist;

export const blocklistReducer = blocklistSlice.reducer;
