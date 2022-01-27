import { IsOptional, IsString } from 'class-validator';

export class GetDoctorsDto {
  @IsOptional()
  @IsString()
  specialty: string;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  limit: string;

  @IsOptional()
  @IsString()
  order: string;

  @IsOptional()
  @IsString()
  orderBy: string;
}
