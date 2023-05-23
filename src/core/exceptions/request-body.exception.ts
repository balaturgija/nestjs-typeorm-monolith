import { HttpException, HttpStatus } from '@nestjs/common';

export class RequestBodyException extends HttpException {
  constructor(message: string[]) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
