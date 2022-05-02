import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationRecordDto } from '../dtos';
import { ReservationRecordService } from '../services/reservation-record.service';

@Controller('patient-users')
export class ReservationRecordController {
  constructor(
    private readonly reservationRecordService: ReservationRecordService,
  ) {}

  @Get('reservation-records')
  getReservationRecords() {
    return this.reservationRecordService.getReservationRecords();
  }

  @Get('reservation-records/:id')
  getReservationRecord(@Param('id') id: string) {
    return this.reservationRecordService.getReservationRecord({ id });
  }

  @Post(':id/reservation-records')
  async createReservationRecord(
    @Param('id') id,
    @Body()
    { doctorClinicReservationTimeslotId }: ReservationRecordDto,
  ) {
    await this.reservationRecordService.createReservationRecord({
      patientUserId: id,
      doctorClinicReservationTimeslotId,
    });
  }

  @Delete(':id')
  async deletePatientUser(@Param('id') id: string) {
    await this.reservationRecordService.getReservationRecordOrFail({ id });
    return this.reservationRecordService.deleteReservationRecord(id);
  }
}
