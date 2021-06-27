import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Member } from '../interfaces';
import { RootState } from '../store';

const invitesSlice = createSlice({
  name: 'invites',
  initialState: [] as Member[],
  reducers: {
    update(state, { payload }: PayloadAction<Member[]>) {
      return (state = payload);
    },
    remove(state, { payload }: PayloadAction<{ email: string }>) {
      const { email } = payload;

      const updatedState = state.filter((user) => {
        if (user.email !== email) {
          return user;
        }
      });

      return (state = updatedState);
    },
  },
});

export const { update, remove } = invitesSlice.actions;

export const selectInvites = (state: RootState) => state.invites;

export const invitesReducer = invitesSlice.reducer;
