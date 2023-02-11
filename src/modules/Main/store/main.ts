import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface IUsersInitialState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: IUsersInitialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersStart(state) {
      state.loading = true;
      state.error = null;
    },

    getUsersSuccess(state, action: PayloadAction<IUser[]>) {
      state.loading = false;
      state.users = action.payload;
    },

    getUsersError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUsersStart, getUsersSuccess, getUsersError } =
  usersSlice.actions;
export default usersSlice;
