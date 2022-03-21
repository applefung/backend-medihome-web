export type DoctorField = typeof doctorFields[number];
export const doctorFields = [
  'doctor.id',
  'doctor.name',
  'doctor.languages',
  'doctor.contacts',
  'doctor.qualifications',
  'doctor.services',
  'doctor.hospitalAffiliations',
  'doctor.createdAt',
] as const;
