import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../interfaces';
import { RootState } from '../store';

const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    update(state, { payload }: PayloadAction<{ key: keyof User; data: any }>) {
      const { key, data } = payload;

      const prevDataOfKey: any = state[key];

      const updatedUser = { ...state, [key]: [...prevDataOfKey, data] };

      return updatedUser;
    },
    login(state, { payload }: PayloadAction<User>) {
      if (payload) {
        return (state = { ...payload });
      }

      return (state = payload);
    },
  },
});

export const { login, update } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
