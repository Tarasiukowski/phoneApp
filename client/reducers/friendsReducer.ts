import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../interfaces';
import { RootState } from '../store';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: [] as User[],
  reducers: {
    update(state, { payload }: PayloadAction<User[]>) {
      return (state = payload);
    },
  },
});

export const { update } = friendsSlice.actions;

export const selectFriends = (state: RootState) => state.friends;

export const friendsReducer = friendsSlice.reducer;
