export type UserRole = typeof userRoles[number];
export const userRoles = ['patient', 'doctor', 'admin'];

export type TokenType = typeof tokenTypes[number];
export const tokenTypes = ['REFRESH', 'RESET_PASSWORD'];
