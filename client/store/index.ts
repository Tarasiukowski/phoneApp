import { configureStore } from '@reduxjs/toolkit';

import { invitesReducer, userReducer, friendsReducer, blocklistReducer } from 'reducers';

const store = configureStore({
  reducer: {
    user: userReducer,
    invites: invitesReducer,
    friends: friendsReducer,
    blocklist: blocklistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
