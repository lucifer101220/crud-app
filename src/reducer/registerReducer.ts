import axios from 'axios';
import { IndexedObject } from '../utils/type';
import { FAILURE, REQUEST, SUCCESS } from './action-type.util';
import { defaultValue, IRegisterModel } from '../models/register_model';
import { ICrudPutAction } from '../type/redux-action';

export const ACTION_TYPES = {
  CREATE_USER: 'fli_register/CREATE_USER',
  RESET: 'fli_register/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRegisterModel>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  showModel: false,
};

export type RegisterState = Readonly<typeof initialState>;

// Reducer

export default (state: RegisterState = initialState, action: IndexedObject): RegisterState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.CREATE_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };

    case FAILURE(ACTION_TYPES.CREATE_USER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
        showModel: true,
      };

    case SUCCESS(ACTION_TYPES.CREATE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
        showModel: true,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const apiUrl = 'api/register';

export const createEntity: ICrudPutAction<IRegisterModel> = (entity) => async (dispatch) => {
  try {
    return await dispatch({
      type: ACTION_TYPES.CREATE_USER,
      payload: axios.post(apiUrl, entity),
    });
  } catch (e) {
    return null;
  }
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
