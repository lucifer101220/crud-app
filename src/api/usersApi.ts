import axios from 'axios';
import { Params } from '../application/config/axios-interceptor';
import { IndexedObject } from '../utils/type';

const usersApi: IndexedObject = {
  getAll: (params: Params) => {
    const url = 'users';
    return axios.get(url, { params });
  },
  delete: (id: string | number) => {
    const url = `users/${id}`;
    return axios.delete(url);
  },
};

export default usersApi;
