export interface ErrorResponse {
  code: string;
  message: string;
}

type Locale = 'tc' | 'en';

export type BilingualFormat = Record<Locale, string>;
export type BilingualArrayFormat = Record<Locale, string[]>;

export type OrderType = 'DESC' | 'ASC';
