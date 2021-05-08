import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../interfaces';
import { RootState } from '../store';

const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    login(state, { payload }: PayloadAction<User>) {
      const { firstname, lastname } = payload;

      return (state = { ...payload, fullname: `${firstname} ${lastname}` });
    },
  },
});

export const { login } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
