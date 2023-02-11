import axios from 'axios';
import { IUser } from './Main/store/main';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface IAlbum {
  id: number;
  userId: number;
  title: string;
}

export interface IPost {
  userId: string | number;
  id: number;
  title: string;
  body: string;
}

export const fetchUsers = async (): Promise<IUser[]> => {
  const { data } = await axios.get<IUser[]>(`${BASE_URL}/users`);
  return data;
};

export const fetchAlbums = async (userId: number): Promise<IAlbum[]> => {
  const { data } = await axios.get<IAlbum[]>(
    `${BASE_URL}/albums?userId=${userId}`
  );
  return data;
};

export const fetchPosts = async (userId: number | string): Promise<IPost[]> => {
  const { data } = await axios.get<IPost[]>(
    `${BASE_URL}/posts?userId=${userId}`
  );
  return data;
};
