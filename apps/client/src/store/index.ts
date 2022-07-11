import { configureStore } from '@reduxjs/toolkit';

import { layersReducer } from './layers/slice';
import { syncReducer } from './sync/slice';

const reducer = {
  layers: layersReducer,
  sync: syncReducer
};

export const store = configureStore({
  reducer,
  middleware: (getDefault) => getDefault(),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
