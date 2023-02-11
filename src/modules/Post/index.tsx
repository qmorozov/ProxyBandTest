import { useNavigate, useParams } from 'react-router-dom';
import { getPostsError, getPostsStart, getPostsSuccess } from './store/post';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { useEffect } from 'react';
import { fetchPosts } from '../api';
import Loader from '../../components/Loader';

import Style from '../../styles/pages/Posts.module.scss';

const Post = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const getPosts = async (id: string) => {
    dispatch(getPostsStart());

    try {
      const posts = await fetchPosts(id);
      dispatch(getPostsSuccess(posts));
    } catch (error) {
      if (error instanceof Error) dispatch(getPostsError(error.message));
    }
  };

  useEffect(() => {
    if (id) getPosts(id);
  }, [id]);

  if (loading) <Loader />;

  if (error) <strong>{error}</strong>;

  return (
    <>
      <button className="button" onClick={() => navigate(-1)}>
        Back
      </button>
      <ul className={Style.List}>
        {posts.map(({ id, title, body }) => (
          <li key={id} className={Style.Post}>
            <h2>{title}</h2>
            <p>{body}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Post;
