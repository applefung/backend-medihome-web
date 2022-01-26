import type { ErrorResponse } from '../types/common';

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'SYSTEM_ERROR'
  | 'FORBIDDEN_ERROR';

const errorMap = new Map<ErrorCode, ErrorResponse>([
  [
    'VALIDATION_ERROR',
    {
      code: '00001',
      message: 'Validation error',
    },
  ],
  [
    'SYSTEM_ERROR',
    {
      code: '00002',
      message: 'System error',
    },
  ],
  [
    'FORBIDDEN_ERROR',
    {
      code: '00003',
      message: 'Access denied',
    },
  ],
]);

export const getResponseByErrorCode = (errorCode: ErrorCode) =>
  errorMap.get(errorCode);