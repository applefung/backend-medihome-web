export type DoctorCommentParam = Record<'id' | 'commentId', string>;

export interface DoctorComment {
  id: string;
  title: string;
  content: string;
  rating: number;
  patientUserId: string;
}
