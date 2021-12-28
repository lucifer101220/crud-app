import { IndexedObject } from './type';

export const omit = (key: string, obj: IndexedObject) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};

export const cleanEntity = (obj: any) => {
  const { ['id']: omitted, ...rest } = obj;
  return rest;
};
