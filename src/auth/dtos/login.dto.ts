import { UserRole, userRoles } from '@src/utils/auth';
import { IsEmail, IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsIn(userRoles)
  role: UserRole;
}
