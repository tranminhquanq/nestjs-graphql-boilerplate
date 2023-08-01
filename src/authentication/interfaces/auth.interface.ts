import { IUser } from '@/models/user/interfaces/user.interface';

export type TUserResponse = Omit<IUser, 'password'>;
export interface IAuthenticateResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: TUserResponse;
}

export type TRefreshTokenResponse = Pick<
  IAuthenticateResponse,
  'access_token' | 'expires_in'
>;
