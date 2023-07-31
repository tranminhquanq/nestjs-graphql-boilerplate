import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(message: string, messageCode: string) {
    super(
      {
        message,
        message_code: messageCode,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
