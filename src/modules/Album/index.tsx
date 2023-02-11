import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import {
  getAlbumsError,
  getAlbumsStart,
  getAlbumsSuccess,
} from './store/album';
import Loader from '../../components/Loader';

const Album = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { albums, loading, error } = useAppSelector((state) => state.albums);
  const fetchAlbums = async (id: string) => {
    dispatch(getAlbumsStart());

    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?userId=${id}`
      );
      const posts = response.data;
      dispatch(getAlbumsSuccess(posts));
    } catch (error: any) {
      dispatch(getAlbumsError(error.message));
    }
  };

  useEffect(() => {
    if (id) {
      fetchAlbums(id);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return <></>;
};

export default Album;
