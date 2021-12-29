import usersApi from '../api/usersApi';
// import { notificationUsers } from '../components/Users/Users';
import { ICrudDeleteAction, ICrudGetAllAction } from '../type/redux-action';
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
        usersList: action.payload,
        totalUsers: action.payload.length,
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

export const getAllUsers: ICrudGetAllAction<User> = (params) => async (dispatch: any) => {
  try {
    return await dispatch({
      type: ACTION_TYPES.GET_USERS,
      payload: usersApi.getAll(params),
    });
  } catch (e) {
    return null;
  }
};

export const deleteUser: ICrudDeleteAction<User> = (id) => async (dispatch: any) => {
  try {
    const resDelete = await usersApi.delete(id);
    // if (resDelete && resDelete.id) {
    //   notificationUsers(`Delete ${resDelete.name} successfully !`, 'frown');
    // } else notificationUsers('Delete failure !');
    return await dispatch({
      type: ACTION_TYPES.GET_USERS,
      payload: usersApi.getAll(),
    });
  } catch (e) {
    return null;
  }
};

export default usersReducer;
