import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Member } from 'interfaces';
import { RootState } from 'setup/store';

type Key = keyof Member;

const invitesSlice = createSlice({
  name: 'invites',
  initialState: [] as Member[],
  reducers: {
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
