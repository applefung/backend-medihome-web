import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender, genders } from '@src/utils/common';

export class PatientUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @IsIn(genders)
  gender: Gender;

  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;
}
