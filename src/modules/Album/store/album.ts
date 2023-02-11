import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAlbums {
  userId: number;
  id: number;
  title: string;
}

interface IAlbumsInitialState {
  albums: IAlbums[];
  error: string | null;
  loading: boolean;
}

const initialState: IAlbumsInitialState = {
  albums: [],
  error: null,
  loading: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    getAlbumsStart(state) {
      state.loading = true;
      state.error = null;
    },

    getAlbumsSuccess(state, action: PayloadAction<IAlbums[]>) {
      state.loading = false;
      state.albums = action.payload;
    },

    getAlbumsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getAlbumsStart, getAlbumsSuccess, getAlbumsError } =
  albumsSlice.actions;
export default albumsSlice;
