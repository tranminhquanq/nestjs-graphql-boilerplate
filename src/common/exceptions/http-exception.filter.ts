import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

interface ErrorResponse {
  message: string;
  message_code: string;
  status_code: number;
}
export class CustomException extends HttpException {
  constructor(message: string, messageCode: string, statusCode: number) {
    super(
      { message, message_code: messageCode, status_code: statusCode },
      statusCode,
    );
  }
}
@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof CustomException) {
      const { status_code, ...restOfError } =
        exception.getResponse() as ErrorResponse;

      response.status(status || status_code).json({
        ...restOfError,
        timestamp: new Date().toISOString(),
      });
    } else {
      super.catch(exception, host);
    }
  }
}
