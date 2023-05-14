import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionModel } from '../model/exception.model';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionModel = new ExceptionModel();
    exceptionModel.statusCode = exception.getStatus();
    exceptionModel.message = exception.getResponse();
    exceptionModel.timestamp = new Date().toISOString();
    exceptionModel.path = ctx.getRequest<Request>().url;

    response.status(exceptionModel.statusCode).json(exceptionModel);
  }
}
