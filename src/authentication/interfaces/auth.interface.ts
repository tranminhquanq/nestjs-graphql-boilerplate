import { TUserResponse } from './user.interface';

export type TLoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: TUserResponse;
};
