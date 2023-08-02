import { CustomException } from '@/common/exceptions/http-exception.filter';
import { HttpStatus, Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { IUser } from '@/models/user/interfaces/user.interface';
import { omit } from 'lodash';

@Injectable()
export class BaseAuthenticationService {
  protected grantTypeErrorMessage = 'Grant type is required';
  protected grantTypeErrorCode = 'grant_type_required';
  protected grantTypeNotSupportedErrorMessage =
    'Does not support this grant_type';
  protected grantTypeNotSupportedErrorCode = 'grant_type_not_supported';

  protected validateGrantType(grant_type: string): void {
    if (!grant_type) {
      throw new CustomException(
        this.grantTypeErrorMessage,
        this.grantTypeErrorCode,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!this[grant_type]) {
      throw new CustomException(
        this.grantTypeNotSupportedErrorMessage,
        this.grantTypeNotSupportedErrorCode,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  protected transformUserResponseSendToClient(user: IUser) {
    return omit(user, ['password']);
  }
  protected comparePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  protected hashPassword(password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
}
