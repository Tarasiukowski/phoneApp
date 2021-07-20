import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { Member } from 'interfaces';
import { RootState } from 'setup/store';
import { Reducers, Key } from './types';

const friendsSlice = createSlice<Member[], Reducers, 'friends'>({
  name: 'friends',
  initialState: [] as Member[],
  reducers: {
    updateOne(state, { payload }) {
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
    update(_, { payload }) {
      return payload;
    },
    remove(state, { payload }) {
      const { by, value } = payload;

      const updatedState = state.filter((user) => {
        if (user[by] !== value) {
          return user;
        }
      });

      return [...updatedState];
    },
    add(state, { payload }) {
      const { user } = payload;

      return [...state, user];
    },
  },
});

const selectFriends = (state: RootState) => state.friends;

export const { update, remove, add, updateOne } = friendsSlice.actions;

export const friendsReducer = friendsSlice.reducer;

export const useFriends = () => {
  const friends = useSelector(selectFriends);

  return friends;
};
