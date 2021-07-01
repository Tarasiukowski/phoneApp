import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Member } from '../interfaces';
import { RootState } from '../store';

type Key = keyof Member;

const friendsSlice = createSlice({
  name: 'friends',
  initialState: [] as Member[],
  reducers: {
    updateOne(
      state,
      {
        payload,
      }: PayloadAction<{
        email: string;
        key: Key;
        value: Member['notes'][number];
      }>,
    ) {
      const { email, key, value } = payload;

      const updatedState = state.map((user) => {
        if (user.email === email) {
          let updatedUser;
          const prevDataOfKey: Member[Key] = user[key];

          if (Array.isArray(prevDataOfKey)) {
            updatedUser = { ...user, [key]: [...prevDataOfKey, value] };
          } else {
            updatedUser = { ...user, [key]: value };
          }

          return updatedUser;
        }

        return user;
      });

      return updatedState;
    },
    update(_, { payload }: PayloadAction<Member[]>) {
      return payload;
    },
    remove(state, { payload }: PayloadAction<{ by: Key; value: Member[Key] }>) {
      const { by, value } = payload;

      const updatedState = state.filter((user) => {
        if (user[by] !== value) {
          return user;
        }
      });

      return [...updatedState];
    },
    add(state, { payload }: PayloadAction<{ user: Member }>) {
      const { user } = payload;

      return [...state, user];
    },
  },
});

export const { update, remove, add, updateOne } = friendsSlice.actions;

export const selectFriends = (state: RootState) => state.friends;

export const friendsReducer = friendsSlice.reducer;
