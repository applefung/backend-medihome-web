import { BadRequestException, ValidationError } from '@nestjs/common';
import { getResponseByErrorCode } from './error';

function findAllErrorConstraints(errors: ValidationError[]): string[] {
  return errors
    .map(({ constraints, children }) =>
      !children?.length
        ? Object.values(constraints)
        : findAllErrorConstraints(children).flat(),
    )
    .flat();
}

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super({
      ...getResponseByErrorCode('VALIDATION_ERROR'),
      details: findAllErrorConstraints(errors),
    });
  }
}
