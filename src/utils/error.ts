import type { ErrorResponse } from '../types/common';

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'SYSTEM_ERROR'
  | 'FORBIDDEN_ERROR'
  | 'TOKEN_NOT_FOUND'
  | 'TOKEN_EXPIRED'
  | 'CAROUSEL_NOT_FOUND'
  | 'SPECIALTY_NOT_FOUND'
  | 'DOCTOR_NOT_FOUND'
  | 'DOCTOR_COMMENT_NOT_FOUND';

// General Error 0XXXX
// Auth Error 1XXXX
// Carousel Error 2XXXX
// Specialty Error 3XXXX
// Doctor Error 4XXXX
// Doctor Comment Error 5XXXX
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
    'TOKEN_NOT_FOUND',
    {
      code: '10001',
      message: 'Refresh token not found',
    },
  ],
  [
    'TOKEN_EXPIRED',
    {
      code: '10002',
      message: 'Refresh token not found',
    },
  ],
  [
    'CAROUSEL_NOT_FOUND',
    {
      code: '20001',
      message: 'Carousel not found',
    },
  ],
  [
    'SPECIALTY_NOT_FOUND',
    {
      code: '30001',
      message: 'Specialty not found',
    },
  ],
  [
    'DOCTOR_NOT_FOUND',
    {
      code: '40001',
      message: 'Doctor not found',
    },
  ],
  [
    'DOCTOR_COMMENT_NOT_FOUND',
    {
      code: '50001',
      message: 'Doctor comment not found',
    },
  ],
]);

export const getResponseByErrorCode = (errorCode: ErrorCode) =>
  errorMap.get(errorCode);
