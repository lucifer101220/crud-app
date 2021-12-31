import axios from 'axios';
import { Params } from '../application/config/axios-interceptor';
import { City } from '../type/type';
import { IndexedObject } from '../utils/type';

const citysApi: IndexedObject = {
  getAll: (params: Params) => {
    const url = 'citys';
    return axios.get(url, { params });
  },
  create: (data: City) => {
    const url = 'citys';
    return axios.post(url, data);
  },
  edit: (data: City) => {
    const url = `citys/${data.id}`;
    return axios.put(url, data);
  },
  delete: (id: string | number) => {
    const url = `citys/${id}`;
    return axios.delete(url);
  },
};

export default citysApi;
