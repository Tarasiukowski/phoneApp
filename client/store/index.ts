import { configureStore } from '@reduxjs/toolkit';

import { invitesReducer, userReducer, friendsReducer } from '../reducers';

const store = configureStore({
  reducer: {
    user: userReducer,
    invites: invitesReducer,
    friends: friendsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
