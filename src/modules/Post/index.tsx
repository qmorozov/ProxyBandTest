import { useNavigate, useParams } from 'react-router-dom';
import { getPostsError, getPostsStart, getPostsSuccess } from './store/post';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { useEffect } from 'react';
import Loader from '../../components/Loader';
import Style from '../../styles/pages/Posts.module.scss';

const Post = () => {
  const navigate = useNavigate();
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
