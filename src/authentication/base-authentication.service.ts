import { CustomException } from '@/common/exceptions/http-exception.filter';
import { HttpStatus, Injectable } from '@nestjs/common';

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
}
