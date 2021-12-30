import axios from 'axios';
import { Params } from '../application/config/axios-interceptor';
import { User } from '../type/users';
import { IndexedObject } from '../utils/type';

export const PAGE_SIZE_USERS = 8;

const usersApi: IndexedObject = {
  getAll: (params: Params) => {
    const url = 'users';
    return axios.get(url, { params });
  },
  create: (data: User) => {
    const url = 'users';
    return axios.post(url, data);
  },
  edit: (data: User) => {
    const url = `users/${data.id}`;
    return axios.put(url, data);
  },
  delete: (id: string | number) => {
    const url = `users/${id}`;
    return axios.delete(url);
  },
};

export default usersApi;
