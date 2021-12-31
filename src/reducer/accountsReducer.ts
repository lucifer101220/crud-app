import { useHistory } from 'react-router-dom';
import accountsApi from '../api/accountsApi';
import { Params } from '../application/config/axios-interceptor';
import { notificationApp } from '../components/notification';
import { ICrudDeleteAction, ICrudGetAllAction, ICrudPutAction } from '../type/redux-action';
import { Account } from '../type/type';
import { IndexedObject } from '../utils/type';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';

const ACTION_TYPES = {
  GET_ACCOUNTS: 'accounts/GET_ACCOUNTS',
};

export type AccountsState = {
  loading: boolean;
  error: IndexedObject | null;
  accountsList: Account[];
  totalAccounts: number;
};

const initialState: AccountsState = {
  loading: false,
  error: null,
  accountsList: [],
  totalAccounts: 0,
};

const accountsReducer = (state = initialState, action: IndexedObject): AccountsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.GET_ACCOUNTS):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTION_TYPES.GET_ACCOUNTS):
      return {
        ...state,
        loading: false,
        accountsList: action.payload.data,
        totalAccounts: action.payload.count,
      };
    case FAILURE(ACTION_TYPES.GET_ACCOUNTS):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllAccounts: ICrudGetAllAction<Params> = (params) => async (dispatch: any) => {
  try {
    return await dispatch({
      type: ACTION_TYPES.GET_ACCOUNTS,
      payload: accountsApi.getAll(params),
    });
  } catch (e) {
    return null;
  }
};

// export const deleteAccount: ICrudDeleteAction<Account> = (id) => async (dispatch: any) => {
//   try {
//     const res = await accountsApi.delete(id);
//     if (res && res.id) {
//       notificationApp(`Delete '${res.name}' successfully !`);
//     } else notificationApp('Delete failure !', 'frown');
//     return await dispatch(getAllAccounts());
//   } catch (e) {
//     return null;
//   }
// };

export const createAccount: ICrudPutAction<Account> = (data) => async (dispatch: any) => {
  try {
    const res = await accountsApi.create(data);
    if (res && res.id) {
      notificationApp(`Register successfully. You can login !`);
    } else notificationApp('Create failure !', 'frown');
    return await dispatch(getAllAccounts());
  } catch (e) {
    return null;
  }
};

// export const editAccount: ICrudPutAction<Account> = (data) => async (dispatch: any) => {
//   try {
//     const res = await accountsApi.edit(data);
//     if (res && res.id) {
//       notificationApp(`Update '${res.name}' successfully !`);
//     } else notificationApp('Update failure !', 'frown');
//     return await dispatch(getAllAccounts());
//   } catch (e) {
//     return null;
//   }
// };

export default accountsReducer;
