import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../interfaces';
import { RootState } from '../store';

type Key = keyof User;
type PayloadData<T extends Key> = {
  key: Key;
  data: User[T] extends Array<any> ? User[T][number] | any : User[T];
  option: User[T] extends Array<any>
    ? {
        type: 'pull' | 'push';
        by?: User[T] extends Array<any> ? keyof User[T][number] : keyof User[T];
        value?: string;
      }
    : undefined;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    update(state, { payload }: PayloadAction<PayloadData<'groups'>>) {
      let updatedUser;

      const {
        key,
        data,
        option: { type, by, value },
      } = payload;

      const dataOfKey: User[typeof key] = state['groups'];

      if (Array.isArray(dataOfKey)) {
        if (type === 'push') {
          updatedUser = { ...state, [key]: [...dataOfKey, data] };
        } else if (type === 'pull') {
          const filterDataOfKey = dataOfKey.filter((elem) => {
            if (value && by && value !== elem[by]) {
              return elem;
            }
          });

          updatedUser = { ...state, ['groups']: filterDataOfKey };
        }
      }

      return updatedUser;
    },
    login(_, { payload }: PayloadAction<User>) {
      return payload;
    },
  },
});

export const { login, update } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
