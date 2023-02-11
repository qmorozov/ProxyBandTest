import { createSlice } from '@reduxjs/toolkit';

interface IAlbums {
  userId: number;
  id: number;
  title: string;
}

interface ICounterState {
  albums: IAlbums[];
}

const initialState: ICounterState = {
  albums: [],
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
});

export const {} = albumsSlice.actions;
export default albumsSlice;
