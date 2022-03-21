import argon2 from 'argon2';

const argon2Options: argon2.Options & { raw?: false } = {
  type: argon2.argon2id,
};

export const encryptPassword = (password: string) =>
  argon2.hash(password, argon2Options);

export const verifyPassword = (hash: string, plain: string) =>
  argon2.verify(hash, plain, argon2Options);

export type UserRole = typeof userRoles[number];
export const userRoles = ['patient', 'doctor', 'admin'] as const;

export type TokenType = typeof tokenTypes[number];
export const tokenTypes = ['REFRESH', 'RESET_PASSWORD'] as const;
