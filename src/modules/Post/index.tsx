import { useParams } from 'react-router-dom';
import { getPostsError, getPostsStart, getPostsSuccess } from './store/post';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { useEffect } from 'react';
import Loader from '../../components/Loader';

const Post = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const fetchPosts = async (id: string) => {
    dispatch(getPostsStart());

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${id}`
      );
      const posts = response.data;
      dispatch(getPostsSuccess(posts));
    } catch (error: any) {
      dispatch(getPostsError(error.message));
    }
  };

  useEffect(() => {
    if (id) {
      fetchPosts(id);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return <></>;
};

export default Post;
