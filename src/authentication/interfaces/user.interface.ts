type TUser = {
  id: number;
  username: string;
  password: string;
  email: string;
};

export type TUserResponse = Omit<TUser, 'password'>;
