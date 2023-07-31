import { CustomException } from '@/common/exceptions/http-exception.filter';
import { UserService } from '@/models/user/users.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TUserResponse } from '@/authentication/interfaces/user.interface';

@Injectable()
export class RegisterStrategiesService {
  constructor(private readonly userService: UserService) {}

  private async credentials(req: Request) {
    console.log('credentials', req.body);
    return this.userService.findOne('credentials');
  }

  private async google(req: Request): Promise<TUserResponse> {
    console.log('google', req.body);
    return this.userService.findOne('google');
  }

  private async phoneNumber(req: Request): Promise<TUserResponse> {
    console.log('phone_number', req.body);
    return this.userService.findOne('phone_number');
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
