import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Invite } from '../interfaces';
import { RootState } from '../store';

const invitesSlice = createSlice({
  name: 'invites',
  initialState: [] as Invite[],
  reducers: {
    update(state, { payload }: PayloadAction<Invite[]>){
      return state = payload
    }
  },
});

export const { update } = invitesSlice.actions

export const selectInvites= (state: RootState) => state.invites;

export const invitesReducer = invitesSlice.reducer;
