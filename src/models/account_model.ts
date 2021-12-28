export interface IAccount {
  id?: number;
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
}

export const defaultValue: Readonly<IAccount> = {};
