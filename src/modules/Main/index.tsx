import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../../components/Loader';
import {
  getUsersError,
  getUsersStart,
  getUsersSuccess,
  IUser,
} from './store/main';
import axios from 'axios';

import Style from '../../styles/pages/Main.module.scss';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  const fetchUsers = async () => {
    dispatch(getUsersStart());

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      const posts = response.data;
      dispatch(getUsersSuccess(posts));
    } catch (error: any) {
      dispatch(getUsersError(error.message));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ul className={Style.List}>
      {users.map((user: IUser) => (
        <li key={user.id} className={Style.User}>
          <h3>{user.name}</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>
            Address: {user.address.street}, {user.address.suite},{' '}
            {user.address.city}, {user.address.zipcode}
          </p>
          <p>Company: {user.company.name}</p>
          <button
            className="button"
            onClick={() => navigate(`/posts/${user.id}`)}
          >
            user posts
          </button>
          <button
            className="button"
            onClick={() => navigate(`/albums/${user.id}`)}
          >
            user albums
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Main;
