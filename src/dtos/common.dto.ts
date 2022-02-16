import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

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

export class MtrDto {
  @IsString()
  station: string;

  @IsString()
  exit: string;
}

class TimeslotDto {
  @IsString()
  fromTime: string;

  @IsString()
  toTime: string;
}

export class BusinessHoursDto {
  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => TimeslotDto)
  mon: TimeslotDto[];

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => TimeslotDto)
  tue: TimeslotDto[];

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => TimeslotDto)
  wed: TimeslotDto[];

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => TimeslotDto)
  thu: TimeslotDto[];

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => TimeslotDto)
  fri: TimeslotDto[];

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => TimeslotDto)
  sat: TimeslotDto[];

  @IsOptional()
  @IsDefined()
  @ValidateNested()
  @Type(() => TimeslotDto)
  sun: TimeslotDto[];
}

export class ReservationTimeDto {
  @IsDateString()
  date: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => TimeslotDto)
  timeslots: TimeslotDto[];
}

export class AddressDto extends BilingualDto {
  @IsNumberString()
  latitude: string;

  @IsNumberString()
  longitude: string;
}
