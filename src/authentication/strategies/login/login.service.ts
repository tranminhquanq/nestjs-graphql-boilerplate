import { omit } from 'lodash';
import { CustomException } from '@/common/exceptions/http-exception.filter';
import { UserService } from '@/models/user/users.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TUserResponse } from '@/authentication/interfaces/user.interface';

@Injectable()
export class LoginService {
  constructor(private readonly userService: UserService) {}

  private async credentials(req: Request) {
    console.log('credentials', req.body);
    const user = await this.userService.findOne('credentials@gmail.com');
    return omit(user, ['password']);
  }

  private async google(req: Request): Promise<TUserResponse> {
    console.log('google', req.body);
    const user = await this.userService.findOne('google@gmail.com');
    return omit(user, ['password']);
  }

  private async phoneNumber(req: Request): Promise<TUserResponse> {
    console.log('phone_number', req.body);
    const user = await this.userService.findOne('phone_number@gmail.com');
    console.log('user', user);
    return omit(user, ['password']);
  }

  strategies(grant_type: string) {
    if (!grant_type)
      throw new CustomException(
        'grant type is required',
        'grant_type_required',
        HttpStatus.BAD_REQUEST,
      );

    console.log('grant_type', grant_type);

    switch (grant_type) {
      case 'credentials':
        return this.credentials.bind(this);
      case 'google':
        return this.google.bind(this);
      case 'phone_number':
        return this.phoneNumber.bind(this);
      default:
        throw new CustomException(
          'does not support this grant_type',
          'grant_type_not_supported',
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
