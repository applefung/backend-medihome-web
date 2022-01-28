import { IsArray, IsOptional, IsString } from 'class-validator';

export class BilingualDto {
  @IsString()
  en: string;

  @IsString()
  tc: string;
}

export class BilingualArrayDto {
  @IsString({ each: true })
  @IsArray()
  en: string[];

  @IsString({ each: true })
  @IsArray()
  tc: string[];
}

export class ContactsDto {
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  email: string[];

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  phone: string[];

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  whatsapp: string[];
}
