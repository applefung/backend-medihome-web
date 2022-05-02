import type { ErrorResponse } from '../types/common';

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'SYSTEM_ERROR'
  | 'FORBIDDEN_ERROR'
  | 'TOKEN_NOT_FOUND'
  | 'WRONG_EMAIL_OR_PASSWORD'
  | 'TOKEN_EXPIRED'
  | 'CAROUSEL_NOT_FOUND'
  | 'SPECIALTY_NOT_FOUND'
  | 'DOCTOR_NOT_FOUND'
  | 'DOCTOR_USER_NOT_FOUND'
  | 'DOCTOR_COMMENT_NOT_FOUND'
  | 'DOCTOR_CLINIC_RESERVATION_TIMESLOT_NOT_FOUND'
  | 'ARTICLE_TOPIC_NOT_FOUND'
  | 'ARTICLE_TAG_NOT_FOUND'
  | 'ARTICLE_ID_IN_MAP_NOT_FOUND'
  | 'CLINIC_NOT_FOUND'
  | 'RESERVATION_RECORD_NOT_FOUND'
  | 'RESERVATION_RECORD_ALREADY_EXIST'
  | 'DISTRICT_NOT_FOUND'
  | 'REGION_NOT_FOUND'
  | 'PATIENT_USER_NOT_FOUND';

// General Error 0XXXX
// Auth Error 1XXXX
// Carousel Error 2XXXX
// Specialty Error 3XXXX
// Doctor Error 4XXXX
// Doctor Comment Error 5XXXX
// Article Error 6XXXX
// Clinic Error 7XXXX
// District and Region Error 8XXXX
// Patient Error 9XXXX
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
    'WRONG_EMAIL_OR_PASSWORD',
    {
      code: '10002',
      message: 'Wrong email or password',
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
    'DOCTOR_USER_NOT_FOUND',
    {
      code: '40002',
      message: 'Doctor user not found',
    },
  ],
  [
    'DOCTOR_CLINIC_RESERVATION_TIMESLOT_NOT_FOUND',
    {
      code: '40003',
      message: 'Doctor clinic reservation timeslot not found',
    },
  ],
  [
    'DOCTOR_COMMENT_NOT_FOUND',
    {
      code: '50001',
      message: 'Doctor comment not found',
    },
  ],
  [
    'ARTICLE_TOPIC_NOT_FOUND',
    {
      code: '60001',
      message: 'Article topic not found',
    },
  ],
  [
    'ARTICLE_TAG_NOT_FOUND',
    {
      code: '60002',
      message: 'Article tag not found',
    },
  ],
  [
    'ARTICLE_ID_IN_MAP_NOT_FOUND',
    {
      code: '60003',
      message: 'Article id in map not found',
    },
  ],
  [
    'CLINIC_NOT_FOUND',
    {
      code: '70001',
      message: 'Clinic not found',
    },
  ],
  [
    'RESERVATION_RECORD_NOT_FOUND',
    {
      code: '70001',
      message: 'Reservation record not found',
    },
  ],
  [
    'RESERVATION_RECORD_ALREADY_EXIST',
    {
      code: '70001',
      message: 'Reservation record already exist',
    },
  ],
  [
    'DISTRICT_NOT_FOUND',
    {
      code: '80001',
      message: 'District not found',
    },
  ],
  [
    'REGION_NOT_FOUND',
    {
      code: '80002',
      message: 'Region not found',
    },
  ],
  [
    'PATIENT_USER_NOT_FOUND',
    {
      code: '00002',
      message: 'Patient user not found',
    },
  ],
]);

export const getResponseByErrorCode = (errorCode: ErrorCode) =>
  errorMap.get(errorCode);
