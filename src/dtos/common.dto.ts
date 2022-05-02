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

export class TimeslotDto {
  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsOptional()
  @IsArray()
  patientIds: string[];
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

export class LocationDto {
  @IsNumberString()
  latitude: string;

  @IsNumberString()
  longitude: string;
}

export class AddressDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  name: BilingualDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}

export class NameDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  firstName: BilingualDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  lastName: BilingualDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => BilingualDto)
  fullName: BilingualDto;
}
