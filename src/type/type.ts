export type User = {
  name?: string;
  phone?: string;
  email?: string;
  id?: number | string;
  image_id?: number;
  avatar_id?: number;
  created_at?: number;
};

export type Account = {
  id?: number | string;
  name?: string;
  phone?: number | string | null;
  email?: string;
  token?: string;
  password?: string;
};

export type City = {
  name?: string;
  state?: string;
  zip_code?: string;
  id?: number | string;
  country?: string;
  created_at?: number;
};
