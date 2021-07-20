import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

import { Member } from 'interfaces';
import { RootState } from 'setup/store';
import { Reducers } from './types';

const invitesSlice = createSlice<Member[], Reducers, 'invites'>({
  name: 'invites',
  initialState: [] as Member[],
  reducers: {
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

      return updatedState;
    },
  },
});

const selectInvites = (state: RootState) => state.invites;

export const { update, remove } = invitesSlice.actions;

export const invitesReducer = invitesSlice.reducer;

export const useInvites = () => {
  const invites = useSelector(selectInvites);

  return invites;
};
