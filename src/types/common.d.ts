export interface ErrorResponse {
  code: string;
  message: string;
}

type Locale = 'tc' | 'en';

export type BilingualFormat = Record<Locale, string>;
export type BilingualArrayFormat = Record<Locale, string[]>;

export type OrderType = 'DESC' | 'ASC';

// ! May hard code in frontend
export interface MtrType {
  station: string;
  exit: string;
}

export interface Timeslot {
  fromTime: string;
  toTime: string;
}
export type BusinessHours = Partial<
  Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', Timeslot[]>
>;
