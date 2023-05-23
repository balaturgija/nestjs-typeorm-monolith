import { HttpException, HttpStatus } from '@nestjs/common';

export class PostNotFoundException extends HttpException {
  constructor(message = 'Post not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
