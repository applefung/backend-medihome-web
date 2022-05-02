import { IsString, IsUUID } from 'class-validator';

export class ReservationRecordDto {
  @IsUUID()
  @IsString()
  doctorClinicReservationTimeslotId: string;
}
