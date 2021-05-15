import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Member } from '../interfaces';
import { RootState } from '../store';

const invitesSlice = createSlice({
  name: 'invites',
  initialState: [] as Member[],
  reducers: {
    update(state, { payload }: PayloadAction<Member[]>){
      return state = payload
    }
  },
});

export const { update } = invitesSlice.actions

export const selectInvites= (state: RootState) => state.invites;

export const invitesReducer = invitesSlice.reducer;
