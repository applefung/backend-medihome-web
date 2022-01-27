import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { BilingualDto } from 'src/dtos';

export class SpecialtyDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;
}
