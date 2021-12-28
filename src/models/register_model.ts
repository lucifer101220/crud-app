export interface IRegisterModel {
  id?: number;
  fullName?: string;
  email?: string;
  password?: string;
  login?: string;
}
export const defaultValue: Readonly<IRegisterModel> = {};
