import { IndexedObject } from './type';

export const isEmptyObject = (obj: IndexedObject): boolean => {
  for (const prop in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
};

export const publicUrl = (url: string): string => {
  return `${process.env.PUBLIC_URL}${url}`;
};

export const randomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};
