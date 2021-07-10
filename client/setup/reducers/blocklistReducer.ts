import { useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Member } from 'interfaces';
import { RootState } from 'setup/store';

type Key = keyof Member;

const blocklistSlice = createSlice({
  name: 'blocklist',
  initialState: [] as Member[],
  reducers: {
    update(_, { payload }: PayloadAction<Member[]>) {
      return payload;
    },
    remove(state, { payload }: PayloadAction<{ by: Key; value: Member[Key] }>) {
      const { by, value } = payload;

      state = state.filter((user) => {
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
