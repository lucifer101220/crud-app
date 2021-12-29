import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppStoreDispatch, RootState } from '../../reducer';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const UseDispatch = () => useDispatch<AppStoreDispatch>();
export const UseSelector: TypedUseSelectorHook<RootState> = useSelector;
