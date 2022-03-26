import { Type } from 'class-transformer';
import {
  IsDefined,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { BilingualDto, NameDto, ContactsDto } from '@src/dtos';
import {
  GenderLowerCase,
  gendersLowerCase,
  languages,
} from '@src/utils/common';
import { CreateClinicDto } from '@src/clinic/dtos';

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
  @Type(() => BilingualDto)
  qualifications: BilingualDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => BilingualDto)
  services: BilingualDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => BilingualDto)
  hospitalAffiliations: BilingualDto[];

  @IsUUID()
  specialtyId: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateClinicDto)
  clinics: CreateClinicDto[];
}
