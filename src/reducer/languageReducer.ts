import { LangAction } from '../type/types';
import { getCookie } from '../shared/cookie';
import { LANGUAGE_KEY } from '../shared/constant/constant';
import { SET_LANGUAGE } from '../store/actionTypes';

const initialState = {
  language: getCookie(LANGUAGE_KEY) ?? 'vi',
};

export type LangState = typeof initialState;

const langReducer = (state = initialState, action: LangAction): LangState => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default langReducer;
