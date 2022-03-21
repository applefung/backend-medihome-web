export type Order = typeof orders[number];
export const orders = ['DESC', 'ASC'] as const;

export type Gender = typeof genders[number];
export const genders = ['FEMALE', 'MALE'] as const;

export type GenderLowerCase = typeof genders[number];
export const gendersLowerCase = ['female', 'male'] as const;

export type Language = typeof languages[number];
export const languages = ['english', 'cantonese', 'putonghua'];
