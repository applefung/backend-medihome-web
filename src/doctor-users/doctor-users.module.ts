import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicsModule } from '@src/clinic/clinic.module';
import {
  DoctorClinicReservationTimeslot,
  DoctorComment,
  DoctorUser,
} from '@src/entities';
import { PatientUsersModule } from '@src/patient-users/patient-users.module';
import { SpecialtiesModule } from '@src/specialties/specialties.module';
import { DoctorClinicReservationTimeslotController } from './controllers/doctor-clinic-reservation-timeslot..controller';
import { DoctorCommentsController } from './controllers/doctor-comments.controller';
import { DoctorUsersController } from './controllers/doctor-users.controller';
import { DoctorClinicReservationTimeslotService } from './services/doctor-clinic-reservation-timeslot..service';
import { DoctorCommentsService } from './services/doctor-comments.service';
import { DoctorUsersService } from './services/doctor-users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorUser,
      DoctorComment,
      DoctorClinicReservationTimeslot,
    ]),
    SpecialtiesModule,
    ClinicsModule,
  ],
  controllers: [
    DoctorUsersController,
    DoctorCommentsController,
    DoctorClinicReservationTimeslotController,
  ],
  providers: [
    DoctorUsersService,
    DoctorCommentsService,
    DoctorClinicReservationTimeslotService,
  ],
  exports: [
    DoctorUsersService,
    DoctorCommentsService,
    DoctorClinicReservationTimeslotService,
  ],
})
export class DoctorUsersModule {}
