import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'interfaces';
import { RootState } from 'store';

type Key = keyof User;
type PayloadData<K extends Key> = {
  key: Key;
  data?: User[K] extends Array<any> ? User[K][number] : User[K];
  option: User[K] extends Array<any>
    ? {
        type: 'pull' | 'push';
        by?: User[K] extends Array<any> ? keyof User[K][number] : keyof User[K];
        value?: string;
      }
    : undefined;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {} as User,
  reducers: {
    updateGroup(state, { payload }: PayloadAction<PayloadData<'groups'>>) {
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

export const { login, updateGroup } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;
