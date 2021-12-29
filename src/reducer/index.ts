import { applyMiddleware, combineReducers, compose, createStore, Middleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { ThunkAction, Action } from '@reduxjs/toolkit';
import promiseMiddleware from 'redux-promise-middleware';
import errorMiddleware from '../application/config/error-middleware';
import loggerMiddleware from '../application/config/logger-middleware';
import authenReducer, { AuthenticationState } from './authenReducer';
import fliRegisterReducer, { RegisterState } from './registerReducer';
import langReducer, { LangState } from './languageReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import usersReducer, { UsersState } from './usersReducer';

export type AppState = {
  authentication: AuthenticationState;
  register: RegisterState;
  language: LangState;
  users: UsersState;
};

const defaultMiddlewares = [thunkMiddleware, errorMiddleware, promiseMiddleware, loggerMiddleware];
const composedMiddlewares = (middlewares: Middleware[]) =>
  composeWithDevTools(applyMiddleware(...defaultMiddlewares, ...middlewares));

const rootReducer = combineReducers<AppState>({
  authentication: authenReducer,
  register: fliRegisterReducer,
  language: langReducer,
  users: usersReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

const initialize = (initialState?: AppState, middlewares = []): Store =>
  createStore(rootReducer, initialState, composedMiddlewares(middlewares));

const store = initialize(peristedState);

store.subscribe(() => {
  saveState(store.getState());
});

export type AppStoreDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
