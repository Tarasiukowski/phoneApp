import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../interfaces';
import { RootState } from '../store';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: [] as User[],
  reducers: {
    updateOne(state, { payload }: PayloadAction<{ email: string; key: keyof User; data: any }>) {
      const { email, key, data } = payload;

      const updatedState = state.map((user) => {
        if (user.email === email) {
          const prevDataOfKey: any = user[key];

          const updatedUser = { ...user, [key]: [...prevDataOfKey, data] };

          return updatedUser;
        }

        return user;
      });

      return updatedState;
    },
    update(state, { payload }: PayloadAction<User[]>) {
      return (state = payload);
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
    add(state, { payload }: PayloadAction<{ user: User }>) {
      const { user } = payload;

      return [...state, user];
    },
  },
});

export const { update, remove, add, updateOne } = friendsSlice.actions;

export const selectFriends = (state: RootState) => state.friends;

export const friendsReducer = friendsSlice.reducer;
