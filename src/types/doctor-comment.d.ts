export type DoctorCommentType = Record<
  'doctorUserId' | 'patientUserId',
  string
> &
  Pick<DoctorComment, 'title' | 'content' | 'rating'>;
