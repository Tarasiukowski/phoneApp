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
    remove(state, { payload }: PayloadAction<{ email: string }>) {
      const { email } = payload;

      const updatedState = state.filter((user) => {
        if (!(user.email === email)) {
          return user;
        }
      });

      return (state = updatedState);
    },
    add(state, { payload }: PayloadAction<{ user: User }>) {
      const { user } = payload;

      return [...state, user];
    },
  },
});

export const { update, remove, add } = friendsSlice.actions;

export const selectFriends = (state: RootState) => state.friends;

export const friendsReducer = friendsSlice.reducer;
