import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

import { Member } from 'interfaces';
import { RootState } from 'setup/store';
import { Reducers } from './types';

const blocklistSlice = createSlice<Member[], Reducers, 'blocklist'>({
  name: 'blocklist',
  initialState: [] as Member[],
  reducers: {
    update(_, { payload }) {
      return payload;
    },
    remove(state, { payload }) {
      const { by, value } = payload;

      return state.filter((user) => {
        if (user[by] !== value) {
          return user;
        }
      });
    },
  },
});

const selectBlocklist = (state: RootState) => state.blocklist;

export const { update, remove } = blocklistSlice.actions;

export const blocklistReducer = blocklistSlice.reducer;

export const useBlocklist = () => {
  const blocklist = useSelector(selectBlocklist);

  return blocklist;
};
