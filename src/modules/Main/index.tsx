import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import {
  getUsersError,
  getUsersStart,
  getUsersSuccess,
  IUser,
} from './store/main';
import { fetchAlbums, fetchUsers, IAlbum } from '../api';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';

import Style from '../../styles/pages/Main.module.scss';

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalData, setModalData] = useState<IAlbum[]>([]);
  const { users, loading, error } = useAppSelector((state) => state.users);

  const getUsers = async () => {
    dispatch(getUsersStart());

    try {
      const users = await fetchUsers();
      dispatch(getUsersSuccess(users));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(getUsersError(error.message));
      }
    }
  };

  const getAlbums = async (id: number) => {
    try {
      const albums = await fetchAlbums(id);
      setModalData(albums);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!visibleModal) {
      setModalData([]);
    }
  }, [visibleModal]);

  if (loading) <Loader />;

  if (error) <strong>{error}</strong>;

  return (
    <>
      <Modal visible={visibleModal} setVisible={setVisibleModal}>
        {modalData.length ? (
          modalData.map(({ id, title }) => (
            <div key={id}>
              <h3>{title}</h3>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </Modal>
      <ul className={Style.List}>
        {users.map(
          ({
            id,
            name,
            username,
            email,
            phone,
            website,
            address,
            company,
          }: IUser) => (
            <li key={id} className={Style.User}>
              <h3>{name}</h3>
              <p>Username: {username}</p>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
              <p>Website: {website}</p>
              <p>
                Address: {address.street}, {address.suite}, {address.city},{' '}
                {address.zipcode}
              </p>
              <p>Company: {company.name}</p>
              <button
                className="button"
                onClick={() => navigate(`ProxyBandTest/posts/${id}`)}
              >
                user posts
              </button>
              <button
                className="button"
                onClick={() => {
                  setVisibleModal(true);
                  getAlbums(id);
                }}
              >
                user albums
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default Main;
