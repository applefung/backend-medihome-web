import { Type } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BilingualArrayDto, BilingualDto, ContactsDto } from '@src/dtos';
import { languages } from '@src/utils/doctor';
import { Gender, genders } from '@src/utils/common';
import { CreateClinicDto } from '@src/clinic/dtos';

export class DoctorDto {
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;

  @IsString()
  @IsIn(genders)
  gender: Gender;

  @IsOptional()
  @IsString({ each: true })
  languages: typeof languages;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactsDto)
  contacts: ContactsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BilingualArrayDto)
  qualifications: BilingualArrayDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BilingualArrayDto)
  services: BilingualArrayDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BilingualArrayDto)
  hospitalAffiliations: BilingualArrayDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateClinicDto)
  clinics: CreateClinicDto[];
}
