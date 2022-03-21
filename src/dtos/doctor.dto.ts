import { Type } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { BilingualArrayDto, ContactsDto } from '@src/dtos';
import {
  GenderLowerCase,
  gendersLowerCase,
  languages,
} from '@src/utils/common';
import { CreateClinicDto } from '@src/clinic/dtos';
import { NameDto } from './common.dto';

export class DoctorDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @IsString()
  @IsIn(gendersLowerCase)
  gender: GenderLowerCase;

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

  @IsUUID()
  specialtyId: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateClinicDto)
  clinics: CreateClinicDto[];
}
