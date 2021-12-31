import axios from 'axios';
import { Params } from '../application/config/axios-interceptor';
import { IAccount } from '../models/account_model';
import { IndexedObject } from '../utils/type';

const accountsApi: IndexedObject = {
  getAll: (params: Params) => {
    const url = 'accounts';
    return axios.get(url, { params });
  },
  create: (data: IAccount) => {
    const url = 'accounts';
    return axios.post(url, data);
  },
  edit: (data: IAccount) => {
    const url = `accounts/${data.id}`;
    return axios.put(url, data);
  },
  delete: (id: string | number) => {
    const url = `accounts/${id}`;
    return axios.delete(url);
  },
};

export default accountsApi;
