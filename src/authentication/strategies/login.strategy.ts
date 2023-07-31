import { TUserResponse } from '@/authentication/interfaces/user.interface';
import { ForbiddenException } from '@/common/exceptions/forbidden.exception';

const user = {
  id: 1,
  username: 'test',
  email: 'admin@gmail.com',
};

export default class LoginStrategies {
  static credentials = async (req: Request): Promise<TUserResponse> => {
    return user;
  };
  static google = async (req: Request): Promise<TUserResponse> => {
    throw new ForbiddenException(
      'google login is not supported',
      'google_login_not_supported',
    );
  };
  static phone_number = async (req: Request): Promise<TUserResponse> => {
    throw new ForbiddenException(
      'phone number login is not supported',
      'phone_number_login_not_supported',
    );
  };
}
