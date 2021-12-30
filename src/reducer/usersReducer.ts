import usersApi, { PAGE_SIZE_USERS } from '../api/usersApi';
import { Params } from '../application/config/axios-interceptor';
import { notificationUsers } from '../components/notification';
import { ICrudDeleteAction, ICrudGetAllAction, ICrudPutAction } from '../type/redux-action';
import { User } from '../type/users';
import { IndexedObject } from '../utils/type';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';

export const ACTION_TYPES = {
  GET_USERS: 'users/GET_USERS',
};

export type UsersState = {
  loading: boolean;
  error: IndexedObject | null;
  usersList: User[];
  totalUsers: number;
};

const initialState: UsersState = {
  loading: false,
  error: null,
  usersList: [],
  totalUsers: 0,
};

const usersReducer = (state = initialState, action: IndexedObject): UsersState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_USERS):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTION_TYPES.GET_USERS):
      return {
        ...state,
        loading: false,
        usersList: action.payload.data,
        totalUsers: action.payload.count,
      };
    case FAILURE(ACTION_TYPES.GET_USERS):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllUsers: ICrudGetAllAction<Params> = (params) => async (dispatch: any) => {
  try {
    return await dispatch({
      type: ACTION_TYPES.GET_USERS,
      payload: usersApi.getAll({
        sortBy: params && params.sortBy ? params.sortBy : 'created_at',
        order: params && params.order ? params.order : 'desc',
        search: params && params.search ? params.search : undefined,
        page: params && params.page ? params.page : 1,
        limit: PAGE_SIZE_USERS,
      }),
    });
  } catch (e) {
    return null;
  }
};

export const deleteUser: ICrudDeleteAction<User> = (id) => async (dispatch: any) => {
  try {
    const res = await usersApi.delete(id);
    if (res && res.id) {
      notificationUsers(`Delete '${res.name}' successfully !`);
    } else notificationUsers('Delete failure !', 'frown');
    return await dispatch(getAllUsers());
  } catch (e) {
    return null;
  }
};

export const createUser: ICrudPutAction<User> = (data) => async (dispatch: any) => {
  try {
    const res = await usersApi.create(data);
    if (res && res.id) {
      notificationUsers(`Create '${res.name}' successfully !`);
    } else notificationUsers('Create failure !', 'frown');
    return await dispatch(getAllUsers());
  } catch (e) {
    return null;
  }
};

export const editUser: ICrudPutAction<User> = (data) => async (dispatch: any) => {
  try {
    const res = await usersApi.edit(data);
    if (res && res.id) {
      notificationUsers(`Update '${res.name}' successfully !`);
    } else notificationUsers('Update failure !', 'frown');
    return await dispatch(getAllUsers());
  } catch (e) {
    return null;
  }
};

export default usersReducer;
