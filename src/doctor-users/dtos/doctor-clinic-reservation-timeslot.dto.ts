import { TimeslotDto } from '@src/dtos';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DoctorClinicReservationTimeslotDto {
  @IsDateString()
  date: string;

  @IsDefined()
  @Type(() => TimeslotDto)
  @ValidateNested()
  timeslot: TimeslotDto;

  @IsString()
  clinicId: string;
}
