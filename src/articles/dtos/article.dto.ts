import { IsString } from 'class-validator';

export class ArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  writer: string;

  @IsString()
  topic: string;

  @IsString({ each: true })
  tags: string[];
}
