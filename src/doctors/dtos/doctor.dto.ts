import { Type } from 'class-transformer';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { BilingualDto } from 'src/dtos';

export class DoctorDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  languages: BilingualDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  contacts: BilingualDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  qualifications: BilingualDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  services: BilingualDto;

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  hospitalAffiliations: BilingualDto;
}
