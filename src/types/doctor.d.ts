export type ContactsFormat = Partial<
  Record<'email' | 'phone' | 'whatsapp', string[]>
>;

export interface CommentType {
  id: string;
  patientUserId: string;
  title: string;
  content: string;
  rating: number;
  time: Date;
}
