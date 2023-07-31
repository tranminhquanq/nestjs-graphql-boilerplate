import { HttpStatus } from '@nestjs/common';
import { TUserResponse } from '@/authentication/interfaces/user.interface';
import { CustomException } from '@/common/exceptions/http-exception.filter';

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
    throw new CustomException(
      'google login is not supported',
      'google_login_not_supported',
      HttpStatus.NOT_IMPLEMENTED,
    );
  };
  static phone_number = async (req: Request): Promise<TUserResponse> => {
    throw new CustomException(
      'phone number login is not supported',
      'phone_number_login_not_supported',
      HttpStatus.NOT_IMPLEMENTED,
    );
  };
}
