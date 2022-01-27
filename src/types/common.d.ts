export interface ErrorResponse {
  code: string;
  message: string;
}

type Locale = 'tc' | 'en';

export type BilingualFormat = Record<Locale, string>;

export type ContactsFormat = PartialRecord<
  'email' | 'phone' | 'whatsapp',
  string
>;
