import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { BilingualDto } from 'src/dtos';

export class CreateSpecialtyDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;
}
