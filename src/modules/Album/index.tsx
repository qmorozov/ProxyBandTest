import { useAppDispatch } from '../../hooks/useAppRedux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import {
  getAlbumsError,
  getAlbumsStart,
  getAlbumsSuccess,
} from './store/album';

const Album = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

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

  return <></>;
};

export default Album;
