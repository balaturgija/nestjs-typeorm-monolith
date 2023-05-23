import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { RequestBodyException } from './exceptions/request-body.exception';

@Injectable()
export class RequestBodyValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const object = await plainToInstance(metadata.metatype, value);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length) {
      const buildErrors = this.buildErrors(errors);
      throw new RequestBodyException(buildErrors);
    }

    return value;
  }

  private buildErrors(errors: ValidationError[]) {
    const errStr: string[] = [];
    errors.map((err) => {
      if (err.children && err.children.length > 0) {
        errStr.push(...this.buildErrors(err.children));
      } else {
        errStr.push(...Object.values(err.constraints));
      }
    });
    return errStr;
  }
}
