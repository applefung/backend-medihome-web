import { IsDefined, IsString } from 'class-validator';

export class BilingualDto {
  @IsDefined()
  @IsString()
  en: string;

  @IsDefined()
  @IsString()
  tc: string;
}
