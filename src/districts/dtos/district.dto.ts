import { Type } from 'class-transformer';
import { IsDefined, IsUUID, ValidateNested } from 'class-validator';
import { BilingualDto } from '@src/dtos';

export class DistrictDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;

  @IsUUID()
  regionId: string;
}
