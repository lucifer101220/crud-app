import { rawStrArr2EnumLikeObj } from './utils/enumLikeObj';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY, LANGUAGE_KEY } from './constant/constant';

export const ECookieKey = rawStrArr2EnumLikeObj([AUTH_TOKEN_KEY, LANGUAGE_KEY]);
type TCookeyKey = keyof typeof ECookieKey;

export const setCookie = (key: TCookeyKey, val: string, expiresIn?: number | Date) =>
  Cookies.set(key, val, { expires: expiresIn, path: '/' });
export const getCookie = (key: TCookeyKey) => Cookies.get(key);
export const removeCookie = (key: TCookeyKey) => Cookies.remove(key, { path: '/' });
