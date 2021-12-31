import citysApi from '../api/citysApi';
import { Params } from '../application/config/axios-interceptor';
import { notificationApp } from '../components/notification';
import { ICrudDeleteAction, ICrudGetAllAction, ICrudPutAction } from '../type/redux-action';
import { City } from '../type/type';
import { IndexedObject } from '../utils/type';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';

const ACTION_TYPES = {
  GET_CITYS: 'citys/GET_CITYS',
};

export type CitysState = {
  loading: boolean;
  error: IndexedObject | null;
  citysList: City[];
  totalCitys: number;
};

const initialState: CitysState = {
  loading: false,
  error: null,
  citysList: [],
  totalCitys: 0,
};

const citysReducer = (state = initialState, action: IndexedObject): CitysState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_CITYS):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTION_TYPES.GET_CITYS):
      return {
        ...state,
        loading: false,
        citysList: action.payload.data,
        totalCitys: action.payload.count,
      };
    case FAILURE(ACTION_TYPES.GET_CITYS):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllCitys: ICrudGetAllAction<Params> = (params) => async (dispatch: any) => {
  try {
    return await dispatch({
      type: ACTION_TYPES.GET_CITYS,
      payload: citysApi.getAll({
        sortBy: params && params.sortBy ? params.sortBy : 'created_at',
        order: params && params.order ? params.order : 'desc',
        search: params && params.search ? params.search : undefined,
      }),
    });
  } catch (e) {
    return null;
  }
};

export const deleteCity: ICrudDeleteAction<City> = (id) => async (dispatch: any) => {
  try {
    const res = await citysApi.delete(id);
    if (res && res.id) {
      notificationApp(`Delete '${res.name}' successfully !`);
    } else notificationApp('Delete failure !', 'frown');
    return await dispatch(getAllCitys());
  } catch (e) {
    return null;
  }
};

export const createCity: ICrudPutAction<City> = (data) => async (dispatch: any) => {
  try {
    const res = await citysApi.create(data);
    if (res && res.id) {
      notificationApp(`Create '${res.name}' successfully !`);
    } else notificationApp('Create failure !', 'frown');
    return await dispatch(getAllCitys());
  } catch (e) {
    return null;
  }
};

export const editCity: ICrudPutAction<City> = (data) => async (dispatch: any) => {
  try {
    const res = await citysApi.edit(data);
    if (res && res.id) {
      notificationApp(`Update '${res.name}' successfully !`);
    } else notificationApp('Update failure !', 'frown');
    return await dispatch(getAllCitys());
  } catch (e) {
    return null;
  }
};

export default citysReducer;
