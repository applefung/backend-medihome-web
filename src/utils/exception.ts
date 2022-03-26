import { BadRequestException, ValidationError } from '@nestjs/common';
import { getResponseByErrorCode } from './error';

const findAllErrorConstraints = (errors: ValidationError[]): string[] =>
  errors
    .map(({ constraints, children }) =>
      !children?.length
        ? Object.values(constraints)
        : findAllErrorConstraints(children).flat(),
    )
    .flat();

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super({
      ...getResponseByErrorCode('VALIDATION_ERROR'),
      details: findAllErrorConstraints(errors),
    });
  }
}
