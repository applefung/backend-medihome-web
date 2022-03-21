import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { GenderLowerCase, gendersLowerCase } from '@src/utils/common';
import { HeightDto, WeightDto } from '@src/dtos/patient-profile.dto';
import { Type } from 'class-transformer';

export class PatientUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  @IsIn(gendersLowerCase)
  gender: GenderLowerCase;

  @IsOptional()
  @IsDateString()
  dateOfBirth: string;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => HeightDto)
  height: HeightDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => WeightDto)
  weight: WeightDto;
}
