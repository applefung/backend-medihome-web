import { BilingualDto } from '@src/dtos';
import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';

export class MtrDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;

  @IsString({ each: true })
  exits: string[];
}
