import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postsSlice from '../modules/Post/store/post';
import usersSlice from '../modules/Main/store/main';
import albumsSlice from '../modules/Album/store/album';

const rootReducer = combineReducers({
  posts: postsSlice.reducer,
  users: usersSlice.reducer,
  albums: albumsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
