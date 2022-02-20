import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GenderLowerCase, gendersLowerCase } from '@src/utils/common';

export class PatientUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @IsIn(gendersLowerCase)
  gender: GenderLowerCase;

  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;
}
