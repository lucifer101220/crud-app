import companysApi from '../api/companysApi';
import { Params } from '../application/config/axios-interceptor';
import { notificationApp } from '../components/notification';
import { ICrudDeleteAction, ICrudGetAllAction, ICrudPutAction } from '../type/redux-action';
import { Company } from '../type/type';
import { IndexedObject } from '../utils/type';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';

const ACTION_TYPES = {
  GET_COMPANYS: 'companys/GET_COMPANYS',
};

export type CompanysState = {
  loading: boolean;
  error: IndexedObject | null;
  companysList: Company[];
  totalCompanys: number;
};

const initialState: CompanysState = {
  loading: false,
  error: null,
  companysList: [],
  totalCompanys: 0,
};

const companysReducer = (state = initialState, action: IndexedObject): CompanysState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_COMPANYS):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTION_TYPES.GET_COMPANYS):
      return {
        ...state,
        loading: false,
        companysList: action.payload.data,
        totalCompanys: action.payload.count,
      };
    case FAILURE(ACTION_TYPES.GET_COMPANYS):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllCompanys: ICrudGetAllAction<Params> = (params) => async (dispatch: any) => {
  try {
    return await dispatch({
      type: ACTION_TYPES.GET_COMPANYS,
      payload: companysApi.getAll({
        sortBy: params && params.sortBy ? params.sortBy : 'created_at',
        order: params && params.order ? params.order : 'desc',
        search: params && params.search ? params.search : undefined,
      }),
    });
  } catch (e) {
    return null;
  }
};

export const deleteCompany: ICrudDeleteAction<Company> = (id) => async (dispatch: any) => {
  try {
    const res = await companysApi.delete(id);
    if (res && res.id) {
      notificationApp(`Delete '${res.name}' successfully !`);
    } else notificationApp('Delete failure !', 'frown');
    return await dispatch(getAllCompanys());
  } catch (e) {
    return null;
  }
};

export const createCompany: ICrudPutAction<Company> = (data) => async (dispatch: any) => {
  try {
    const res = await companysApi.create(data);
    if (res && res.id) {
      notificationApp(`Create '${res.name}' successfully !`);
    } else notificationApp('Create failure !', 'frown');
    return await dispatch(getAllCompanys());
  } catch (e) {
    return null;
  }
};

export const editCompany: ICrudPutAction<Company> = (data) => async (dispatch: any) => {
  try {
    const res = await companysApi.edit(data);
    if (res && res.id) {
      notificationApp(`Update '${res.name}' successfully !`);
    } else notificationApp('Update failure !', 'frown');
    return await dispatch(getAllCompanys());
  } catch (e) {
    return null;
  }
};

export default companysReducer;
