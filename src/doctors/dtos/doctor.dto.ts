import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { BilingualArrayDto, BilingualDto, ContactsDto } from 'src/dtos';
import { languages } from 'src/utils/doctor';

export class DoctorDto {
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;

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
}
