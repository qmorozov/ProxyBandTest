import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import {
  getPostsError,
  getPostsStart,
  getPostsSuccess,
} from '../Post/store/post';
import axios from 'axios';

const Main = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const fetchPosts = async () => {
    dispatch(getPostsStart());

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const posts = response.data;
      dispatch(getPostsSuccess(posts));
    } catch (error: any) {
      dispatch(getPostsError(error.message));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return <></>;
};

export default Main;
