import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FilterResponse } from './types/filter-response';
import { isResponseObject } from './types/response.message.type.guard';

@Catch(HttpException)
export class CoreExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const filterResponse = new FilterResponse(
      status,
      request.url,
      exception.name,
      exceptionResponse,
    );

    if (isResponseObject(exceptionResponse)) {
      filterResponse.message = exceptionResponse.message;
    }

    response.status(status).json(filterResponse);
  }
}
