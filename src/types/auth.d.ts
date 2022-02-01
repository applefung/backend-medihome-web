export type Role =
  | 'patient'
  | 'doctor'
  | 'admin'
  | 'patient-self'
  | 'doctor-self';

export interface AccessTokenPayload {
  id: string;
  role: Role;
}

export type Token = 'REFRESH' | 'RESET_PASSWORD';
