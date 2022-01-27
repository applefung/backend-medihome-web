import type { ErrorResponse } from '../types/common';

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'SYSTEM_ERROR'
  | 'FORBIDDEN_ERROR'
  | 'CAROUSEL_NOT_FOUND'
  | 'SPECIALTY_NOT_FOUND';

// General Error 0XXXX
// Carousel Error 1XXXX
// Specialty Error 2XXXX
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
  [
    'CAROUSEL_NOT_FOUND',
    {
      code: '10001',
      message: 'Carousel not found',
    },
  ],
  [
    'SPECIALTY_NOT_FOUND',
    {
      code: '20001',
      message: 'Specialty not found',
    },
  ],
]);

export const getResponseByErrorCode = (errorCode: ErrorCode) =>
  errorMap.get(errorCode);
