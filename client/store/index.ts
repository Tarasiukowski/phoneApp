import { configureStore } from '@reduxjs/toolkit';

import { invitesReducer, userReducer } from '../reducers';

const store = configureStore({
  reducer: {
    user: userReducer,
    invites: invitesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
