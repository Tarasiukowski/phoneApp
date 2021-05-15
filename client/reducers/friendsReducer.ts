import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Member } from '../interfaces';
import { RootState } from '../store';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: [] as Member[],
  reducers: {
    update(state, { payload }: PayloadAction<Member[]>) {
      return (state = payload);
    },
  },
});

export const { update } = friendsSlice.actions;

export const selectFriends = (state: RootState) => state.friends;

export const friendsReducer = friendsSlice.reducer;
