import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { getResponseByErrorCode } from '@src/utils/error';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  private logger = new Logger('ExceptionFilter');

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json(exception.getResponse());
    } else {
      const err = exception as unknown as Error;

      this.logger.error(err.message, err.stack);
      response.status(500).json({
        ...getResponseByErrorCode('SYSTEM_ERROR'),
        details: err.message ?? null,
      });
    }
  }
}
