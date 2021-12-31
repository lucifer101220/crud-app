import { rejects } from 'assert';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { resolve } from 'dns';
import firebase from 'firebase/compat';
import queryString from 'query-string';
import { notificationApp } from '../../components/notification';
import { Func } from '../../type/types';
import { IndexedObject } from '../../utils/type';

export type Params = {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  search?: string;
};

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.paramsSerializer = (params: Params) => queryString.stringify(params);

const getFirebaseToken = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    return currentUser.getIdToken();
  }
  //Not login
  const hasRememberedAccount = localStorage.getItem('firebaseui::rememberedAccount');
  if (!hasRememberedAccount) {
    return null;
  }
  //Logged in but current user is not fetched -> wait 10s
  return new Promise((resolve, rejects) => {
    const waitTime = setTimeout(() => {
      rejects(null);
    }, 10000);
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        rejects(null);
      } else {
        const token = await user.getIdToken();
        resolve(token);
      }
      unregisterAuthObserver();
      clearTimeout(waitTime);
    });
  });
};

const setupAxiosInterceptors = (onUnauthenticated: Func) => {
  const onRequestSuccess = async (config: AxiosRequestConfig) => {
    // const token = ''; //.get('authenticationToken');

    const token = await getFirebaseToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // config.withCredentials = false;
    config.headers['Content-Type'] = 'application/json';
    config.headers.post['Access-Control-Allow-Origin'] = '*';
    return config;
  };
  const onResponseSuccess = (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  };
  const onResponseError = (err: IndexedObject) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status !== 200 || status !== 201) {
      notificationApp('Request failure !', 'frown');
    }
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
