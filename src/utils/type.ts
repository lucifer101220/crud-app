export type IndexedObject<V = any> = { [k: string]: V };

export type TAction<T> = {
  type: string;
  payload: IndexedObject<T>;
};

export const createMarkup = (TypeText: string) => {
  return { __html: TypeText };
};
