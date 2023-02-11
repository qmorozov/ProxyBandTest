import { createSlice } from '@reduxjs/toolkit';

interface IUser {
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
}

interface IUsers {
  users: IUser[];
}

const initialState: IUsers = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const {} = usersSlice.actions;
export default usersSlice;
