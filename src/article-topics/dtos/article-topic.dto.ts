import { BilingualDto } from '@src/dtos';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';

export class ArticleTopicDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  title: BilingualDto;
}
