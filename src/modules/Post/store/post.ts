import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IPostInitialState {
  posts: IPost[];
  loading: boolean;
  error: string | null;
}

const initialState: IPostInitialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPostsStart(state) {
      state.loading = true;
      state.error = null;
    },

    getPostsSuccess(state, action: PayloadAction<IPost[]>) {
      state.loading = false;
      state.posts = action.payload;
    },

    getPostsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getPostsStart, getPostsSuccess, getPostsError } =
  postsSlice.actions;
export default postsSlice;
