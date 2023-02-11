import { createSlice } from '@reduxjs/toolkit';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface ICounterState {
  posts: IPost[];
}

const initialState: ICounterState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export const {} = postsSlice.actions;
export default postsSlice;
