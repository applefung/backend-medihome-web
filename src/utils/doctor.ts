export type DoctorField = typeof doctorFields[number];
export const doctorFields = [
  'id',
  'name',
  'languages',
  'contacts',
  'qualifications',
  'services',
  'hospitalAffiliations',
  'createdAt',
];

export type Language = typeof languages[number];
export const languages = ['english', 'cantonese', 'putonghua'];
