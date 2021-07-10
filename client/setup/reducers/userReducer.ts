import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'interfaces';
import { RootState } from 'setup/store';

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
  initialState: null as User | null,
  reducers: {
    updateGroup(state, { payload }: PayloadAction<PayloadData<'groups'>>) {
      if (state) {
        const {
          key,
          data,
          option: { type, by, value },
        } = payload;

        const dataOfKey: User[typeof key] = state['groups'];

        if (Array.isArray(dataOfKey)) {
          if (type === 'push') {
            state = { ...state, [key]: [...dataOfKey, data] };
          } else if (type === 'pull') {
            const filterDataOfKey = dataOfKey.filter((elem) => {
              if (value && by && value !== elem[by]) {
                return elem;
              }
            });

            state = { ...state, ['groups']: filterDataOfKey };
          }
        }
      }

      state = null;
    },
    login(state, { payload }: PayloadAction<User>) {
      state = payload;
    },
  },
});

const selectUser = (state: RootState) => state.user;

export const { login, updateGroup } = userSlice.actions;

export const userReducer = userSlice.reducer;

export const useUser = () => {
  const user = useSelector(selectUser);

  return user;
};
