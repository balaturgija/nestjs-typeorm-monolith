import { HttpException, HttpStatus } from '@nestjs/common';

export class CategoryNotFoundException extends HttpException {
  constructor(message = 'Category not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
