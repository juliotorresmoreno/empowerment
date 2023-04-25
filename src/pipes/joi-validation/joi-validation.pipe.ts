import { PipeTransform, Injectable } from '@nestjs/common';
import * as createHttpError from 'http-errors';
import { ObjectSchema } from 'joi';

type TransformValues = any;

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: TransformValues) {
    if (value === null) return value;
    if (typeof value !== 'object') return value;
    if (value.constructor !== Object) return value;

    const { error } = this.schema.validate(value);
    if (error) {
      throw new createHttpError.BadRequest(
        error.message ? `${error.message}` : `Validation failed`,
      );
    }
    return value;
  }
}
