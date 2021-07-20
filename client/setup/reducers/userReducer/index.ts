import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'interfaces';
import { RootState } from 'setup/store';
import { Reducres } from './types';

const userSlice = createSlice<User | null, Reducres, 'user'>({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    update(state, { payload }) {
      if (state) {
        const { key, value, option } = payload;

        const prevValueOfKey: User[typeof key] = state[key];

        if (Array.isArray(prevValueOfKey)) {
          if (option) {
            const { type } = option;

            if (type === 'push') {
              return { ...state, [key]: [...prevValueOfKey, value] };
            } else {
              const updatedValueOfKey = [...prevValueOfKey].map((val) => val);

              return { ...state, [key]: updatedValueOfKey };
            }
          }
        } else {
          return { ...state, [key]: value };
        }
      }

      return null;
    },
    login(_, { payload }: PayloadAction<User>) {
      return payload;
    },
  },
});

const selectUser = (state: RootState) => state.user;

export const { login, update } = userSlice.actions;

export const userReducer = userSlice.reducer;

export const useUser = () => {
  const user = useSelector(selectUser);

  return user;
};
