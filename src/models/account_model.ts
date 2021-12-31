export interface IAccount {
  id?: number | string;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  imageUrl?: string;
  activated?: boolean;
  langKey?: string;
  createdBy?: string;
  createdDate?: any;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  authorities?: string[];

  name?: string;
  phone?: number | string | null;
  token?: string;
  password?: string;
}

export const defaultValue: Readonly<IAccount> = {};
