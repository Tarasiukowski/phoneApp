import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Member } from '../interfaces';
import { RootState } from '../store';

const blocklistSlice = createSlice({
  name: 'blocklist',
  initialState: [] as Member[],
  reducers: {
    update(_, { payload }: PayloadAction< Member[]>) {
      return payload;
    },
  },
});

export const { update } = blocklistSlice.actions;

export const selectBlocklist = (state: RootState) => state.blocklist;

export const blocklistReducer = blocklistSlice.reducer;
