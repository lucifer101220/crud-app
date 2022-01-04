import axios from 'axios';
import { Params } from '../application/config/axios-interceptor';
import { Company } from '../type/type';
import { IndexedObject } from '../utils/type';

const companysApi: IndexedObject = {
  getAll: (params: Params) => {
    console.log(params);
    const url = 'companys';
    return axios.get(url, { params });
  },
  create: (data: Company) => {
    const url = 'companys';
    return axios.post(url, data);
  },
  edit: (data: Company) => {
    const url = `companys/${data.id}`;
    return axios.put(url, data);
  },
  delete: (id: string | number) => {
    const url = `companys/${id}`;
    return axios.delete(url);
  },
};

export default companysApi;
