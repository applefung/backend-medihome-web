import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DoctorClinicReservationTimeslotDto } from '../dtos';
import { DoctorClinicReservationTimeslotService } from '../services/doctor-clinic-reservation-timeslot..service';

@Controller('doctor-users')
export class DoctorClinicReservationTimeslotController {
  constructor(
    private readonly doctorClinicReservationTimeslotService: DoctorClinicReservationTimeslotService,
  ) {}

  @Get(':id/clinic-reservation-timeslot')
  getDoctorClinicReservationTimeslotByDoctorId(@Param('id') id: string) {
    return this.doctorClinicReservationTimeslotService.getDoctorClinicReservationTimeslotDoctorId(
      id,
    );
  }

  @Post(':id/clinic-reservation-timeslots')
  async createDoctorClinicReservationTimeslot(
    @Param('id') doctorUserId: string,
    @Body() data: DoctorClinicReservationTimeslotDto,
  ) {
    console.log('check');
    await this.doctorClinicReservationTimeslotService.createDoctorClinicReservationTimeslot(
      {
        doctorUserId,
        ...data,
      },
    );
  }

  @Delete('clinic-reservation-timeslots/:id')
  async deleteDoctorComment(@Param('id') id: string) {
    await this.doctorClinicReservationTimeslotService.deleteDoctorComment(id);
  }
}
